import { Actor, log } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.init();

const input = await Actor.getInput() ?? {};
const startUrl = input.startUrl || 'https://www.iimjobs.com/k/finance-and-accounts-jobs';
const maxPages = input.maxPages || 5;

log.info(`Starting scrape of ${startUrl}, maxPages=${maxPages}`);

// Step 1: Fetch the listing page to extract tagId/keywordId from __NEXT_DATA__
let tagId;
let keywordId;

const initCrawler = new CheerioCrawler({
    maxConcurrency: 1,
    additionalMimeTypes: ['text/html'],
    preNavigationHooks: [
        (_ctx, gotOptions) => {
            gotOptions.headers = {
                ...gotOptions.headers,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            };
        },
    ],
    async requestHandler({ $, log: reqLog }) {
        const nextDataScript = $('#__NEXT_DATA__').html();
        if (!nextDataScript) {
            throw new Error('Could not find __NEXT_DATA__ on the page');
        }
        const nextData = JSON.parse(nextDataScript);
        const pageProps = nextData.props?.pageProps;
        tagId = pageProps?.tagId;
        keywordId = tagId;
        reqLog.info(`Extracted tagId=${tagId} from __NEXT_DATA__`);
    },
});

await initCrawler.run([startUrl]);

if (!tagId) {
    log.error('Failed to extract tagId from the listing page. Exiting.');
    await Actor.exit();
    process.exit(1);
}

// Step 2: Fetch job data from the API for each page
const API_BASE = 'https://gladiator.iimjobs.com/job/keyword/';
let totalJobs = 0;

for (let page = 0; page < maxPages; page++) {
    const apiUrl = `${API_BASE}?query=${tagId}&page=${page}&industry=&keywordId=${keywordId}`;
    log.info(`Fetching API page ${page + 1}/${maxPages}: ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Referer': startUrl,
                'Origin': 'https://www.iimjobs.com',
            },
        });

        if (!response.ok) {
            log.warning(`API returned ${response.status} for page ${page + 1}`);
            break;
        }

        const json = await response.json();
        const jobs = json.data || [];

        if (jobs.length === 0) {
            log.info(`No jobs on page ${page + 1}, stopping.`);
            break;
        }

        for (const job of jobs) {
            const title = job.title || '';
            const jobId = job.id;

            const company = job.confidential
                ? 'Confidential'
                : (job.companyData?.companyName || '');

            const experienceRange = (job.min != null && job.max != null)
                ? `${job.min} - ${job.max} yrs`
                : '';

            let salaryRange = '';
            if (!job.hideSal && job.minSal > 0 && job.maxSal > 0) {
                salaryRange = `${job.minSal}-${job.maxSal} LPA`;
            }

            const location = (job.locations || job.location || [])
                .map((l) => l.name)
                .join(', ');

            let postedDate = '';
            if (job.createdTimeMs || job.createdTime) {
                const created = new Date(job.createdTimeMs || job.createdTime);
                const now = new Date();
                const diffMs = now - created;
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                if (diffDays === 0) postedDate = 'Posted today';
                else if (diffDays === 1) postedDate = 'Posted 1 day ago';
                else if (diffDays < 7) postedDate = `Posted ${diffDays} days ago`;
                else if (diffDays < 14) postedDate = 'Posted 1 week ago';
                else if (diffDays < 30) postedDate = `Posted ${Math.floor(diffDays / 7)} weeks ago`;
                else postedDate = `Posted ${Math.floor(diffDays / 30)} months ago`;
            }

            const skills = (job.tags || []).map((t) => t.name);

            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            const jobUrl = `https://www.iimjobs.com/j/${slug}-${jobId}`;

            await Actor.pushData({
                title,
                company,
                experienceRange,
                salaryRange,
                location,
                postedDate,
                skills,
                jobUrl,
                jobId,
            });
            totalJobs++;
        }

        log.info(`Page ${page + 1}: scraped ${jobs.length} jobs`);

        if (!json.hasMore) {
            log.info('No more pages available.');
            break;
        }

        // Respect crawl-delay
        if (page < maxPages - 1) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
        }
    } catch (err) {
        log.error(`Error fetching page ${page + 1}: ${err.message}`);
        break;
    }
}

log.info(`Scraping complete. Total jobs scraped: ${totalJobs}`);

await Actor.exit();
