# IIMJobs Scraper

Extract structured job listings from [iimjobs.com](https://www.iimjobs.com) — India's leading job board for MBA, CA, CFA, and premium professionals. Scrape any category or keyword page and get clean, structured JSON data for each job posting.

## What does IIMJobs Scraper do?

This actor scrapes job listings from iimjobs.com and returns structured data including job title, company name, experience range, salary, location, skills, and direct job URLs. It works with any category or keyword listing page on iimjobs.com.

**Key features:**

- Scrapes **50 jobs per page** with automatic pagination
- Extracts **9 structured fields** per job listing
- Works with **any category or keyword URL** on iimjobs.com
- Respects robots.txt with built-in **10-second crawl delay**
- **No login required** — scrapes public listing data only
- Outputs data in **JSON, CSV, Excel, or XML** formats

## Use cases

- **Job market research** — Analyze hiring trends across industries, roles, and cities in India
- **Salary benchmarking** — Compare salary ranges across companies and experience levels
- **Talent intelligence** — Track which skills and certifications are in demand
- **Competitor monitoring** — Monitor hiring activity at specific companies
- **Lead generation** — Find companies actively hiring for specific roles
- **Career analytics** — Build dashboards on job market data for MBA/professional roles

## Input

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `startUrl` | String | Any iimjobs.com category or keyword listing URL | *Required* |
| `maxPages` | Integer | Number of pages to scrape (50 jobs per page) | `5` |

### Example input

```json
{
  "startUrl": "https://www.iimjobs.com/k/finance-and-accounts-jobs",
  "maxPages": 5
}
```

### Supported URL formats

You can use any listing page URL from iimjobs.com:

| Category | Example URL |
|----------|-------------|
| Finance & Accounts | `https://www.iimjobs.com/k/finance-and-accounts-jobs` |
| Sales & Marketing | `https://www.iimjobs.com/k/sales-and-marketing-jobs` |
| Consulting | `https://www.iimjobs.com/k/consulting-jobs` |
| HR & IR | `https://www.iimjobs.com/k/hr-and-ir-jobs` |
| IT & Systems | `https://www.iimjobs.com/k/it-and-systems-jobs` |
| Data Science | `https://www.iimjobs.com/k/data-science-jobs` |
| Specific skills | `https://www.iimjobs.com/k/financial-planning-jobs` |

## Output

Each job listing is returned as a JSON object with the following fields:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | String | Job title | `"Finance Director - BFSI"` |
| `company` | String | Company name (or "Confidential") | `"Ecolab"` |
| `experienceRange` | String | Required experience | `"15 - 30 yrs"` |
| `salaryRange` | String | Salary range (if disclosed) | `"35-50 LPA"` |
| `location` | String | Job location(s) | `"Mumbai"` |
| `postedDate` | String | When the job was posted | `"Posted 2 days ago"` |
| `skills` | Array | Required skills and tags | `["CA", "Financial Planning"]` |
| `jobUrl` | String | Direct URL to the job posting | `"https://www.iimjobs.com/j/..."` |
| `jobId` | Number | Unique job ID | `1737225` |

### Example output

```json
{
  "title": "Head - Plant Finance - Manufacturing - CA",
  "company": "Wizsprint Consultants",
  "experienceRange": "15 - 25 yrs",
  "salaryRange": "35-50 LPA",
  "location": "Kolkata",
  "postedDate": "Posted 1 day ago",
  "skills": [
    "CA",
    "Budgeting",
    "Financial Planning",
    "Financial Operations",
    "Financial Reporting",
    "Valuation",
    "Cost Accounting",
    "Finance and Accounts",
    "Accounting"
  ],
  "jobUrl": "https://www.iimjobs.com/j/head-plant-finance-manufacturing-ca-1737196",
  "jobId": 1737196
}
```

## How many jobs can I scrape?

Each page contains **50 job listings**. With the default `maxPages: 5`, you'll get up to **250 jobs** per run. Set `maxPages` higher to scrape more — some categories have 30+ pages (1,500+ jobs).

| maxPages | Jobs | Estimated run time |
|----------|------|-------------------|
| 1 | ~50 | ~15 seconds |
| 5 | ~250 | ~1 minute |
| 10 | ~500 | ~2 minutes |
| 20 | ~1,000 | ~4 minutes |

Run times include the 10-second crawl delay between pages to respect the site's robots.txt.

## How it works

1. **Discovery** — Fetches the listing page HTML to extract the internal category ID from the embedded Next.js data
2. **Data extraction** — Calls the site's internal API with the category ID, paginating through results (50 jobs per page)
3. **Output** — Pushes each structured job object to the Apify dataset

This approach is faster and more reliable than HTML scraping since the data comes directly from the site's structured API responses.

## Integrations

Connect IIMJobs Scraper to other tools and services:

- **Google Sheets** — Export job data directly to a spreadsheet
- **Slack / Email** — Get notifications when new jobs match your criteria
- **Webhooks** — Send data to any URL on completion
- **Zapier / Make** — Automate workflows with scraped job data
- **APIs** — Access results programmatically via the Apify API

## Cost of usage

The actor uses minimal compute resources since it makes lightweight API calls instead of rendering pages in a browser. A typical run scraping 250 jobs (5 pages) costs less than **$0.01** in Apify platform credits.

## Tips and best practices

- **Start small** — Use `maxPages: 1` to test your URL before running a full scrape
- **Schedule runs** — Set up daily or weekly schedules to track new job postings over time
- **Combine categories** — Run the actor multiple times with different `startUrl` values to cover multiple job categories
- **Export formats** — Download results as JSON, CSV, Excel, or XML from the Apify dataset tab

## Limitations

- Only scrapes **public listing data** — job detail pages require login and are not scraped
- Salary data is only available when the employer chooses to disclose it
- Company names may show as "Confidential" for anonymized postings
