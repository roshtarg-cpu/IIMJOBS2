# IIMJobs Scraper

Extract structured job listings from [iimjobs.com](https://www.iimjobs.com) — India's leading job board for MBA, CA, CFA, and premium professionals. Choose from 80+ job categories, filter by city, experience, industry, and recency, and get clean structured JSON for every listing.

## What does IIMJobs Scraper do?

This actor scrapes job listings from iimjobs.com and returns structured data including job title, company name, experience range, salary, location, skills, and direct job URLs.

**Key features:**

- **80+ job categories** — Finance, Sales, Marketing, Consulting, HR, IT, Legal, Operations, GenAI, and more
- **Rich filters** — Narrow results by location, experience range, industry, and posting recency
- **50 jobs per page** with automatic pagination up to 5,000 jobs
- **9 structured fields** per job listing
- **No login required** — scrapes public listing data only
- Outputs data in **JSON, CSV, Excel, or XML** formats

## Input

### Job Category

| Field | Type | Description |
|-------|------|-------------|
| `category` | Dropdown | Choose from 80+ categories — Finance & Accounts, Banking, Investment Banking, Sales, Marketing, HR, Consulting, IT, Legal, Operations, Data Science, GenAI, and more |
| `customUrl` | Text | *(Optional)* Paste any iimjobs.com listing URL to override the dropdown. Use this for niche keyword pages not listed in the dropdown |

### Filters

| Field | Type | Description |
|-------|------|-------------|
| `location` | Dropdown | Filter by city — Delhi NCR, Mumbai, Bangalore, Hyderabad, Kolkata, Chennai, Pune, or All Locations |
| `minExperience` | Number | Minimum years of experience (0 = no minimum) |
| `maxExperience` | Number | Maximum years of experience (0 = no maximum) |
| `industry` | Dropdown | Filter by industry — Banking/Financial Services, IT, eCommerce, Healthcare, FMCG, Consulting, Manufacturing, Retail, and more |
| `postedWithin` | Dropdown | Only include jobs posted within — Last 24 hours, 3 days, 7 days, 14 days, 30 days, or Any time |

### Settings

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `maxPages` | Number | Pages to scrape (50 jobs/page) | `5` |

### Example inputs

**Basic — scrape all Finance & Accounts jobs:**
```json
{
  "category": "finance-and-accounts-jobs",
  "maxPages": 5
}
```

**Filtered — Senior banking jobs in Mumbai, posted this week:**
```json
{
  "category": "banking-jobs",
  "location": "2",
  "minExperience": 10,
  "maxExperience": 25,
  "industry": "2",
  "postedWithin": 7,
  "maxPages": 3
}
```

**Custom URL — a niche keyword page:**
```json
{
  "customUrl": "https://www.iimjobs.com/k/financial-planning-jobs",
  "maxPages": 2
}
```

### Available categories

<details>
<summary>Banking & Finance (14 categories)</summary>

| Category | Slug |
|----------|------|
| Finance & Accounts | `finance-and-accounts-jobs` |
| Banking | `banking-jobs` |
| Corporate Banking | `corporate-banking-jobs` |
| Investment Banking | `investment-banking-jobs` |
| Private Equity | `private-equity-jobs` |
| Equity Research | `equity-research-jobs` |
| Wealth Management | `wealth-management-jobs` |
| Audit | `audit-jobs` |
| Taxation | `taxation-jobs` |
| Risk Management | `risk-management-jobs` |
| Financial Reporting | `financial-reporting-jobs` |
| Financial Operations | `financial-operations-jobs` |
| Chief Financial Officers | `chief-financial-officer-jobs` |
| Chartered Accountant (CA) | `ca-jobs` |

</details>

<details>
<summary>Sales & Marketing (14 categories)</summary>

| Category | Slug |
|----------|------|
| Sales | `sales-jobs` |
| Marketing | `marketing-jobs` |
| Brand Management | `brand-management-jobs` |
| Online Marketing | `online-marketing-jobs` |
| Marketing Communications | `marketing-communications-jobs` |
| Market Research | `market-research-jobs` |
| Advertising | `advertising-jobs` |
| Corporate Sales | `corporate-sales-jobs` |
| FMCG Sales | `fmcg-sales-jobs` |
| FMCG Marketing | `fmcg-marketing-jobs` |
| BFSI Sales | `bfsi-sales-jobs` |
| Media Sales | `media-sales-jobs` |
| Sales Head | `sales-head-jobs` |
| Marketing Head | `marketing-head-jobs` |

</details>

<details>
<summary>Consulting (12 categories)</summary>

| Category | Slug |
|----------|------|
| Consulting | `consulting-jobs` |
| Strategy Consulting | `strategy-consulting-jobs` |
| Research | `research-jobs` |
| Analytics | `analytics-jobs` |
| Process Excellence | `process-excellence-jobs` |
| Consulting - BFSI | `consulting-bfsi-jobs` |
| Consulting - Consumer Goods | `consulting-consumer-goods-jobs` |
| Consulting - Healthcare | `consulting-healthcare-jobs` |
| Consulting - Supply Chain | `consulting-supply-chain-jobs` |
| Consulting - Energy Sector | `consulting-energy-sector-jobs` |
| Consulting - TMT | `consulting-tmt-jobs` |
| Consulting - Manufacturing | `consulting-manufacturing-jobs` |

</details>

<details>
<summary>HR & IR (11 categories)</summary>

| Category | Slug |
|----------|------|
| HR Consulting | `hr-consulting-jobs` |
| HR Generalist | `hr-generalist-jobs` |
| HR Business Partner | `hr-business-partner-jobs` |
| Talent Acquisition | `talent-acquisition-jobs` |
| Organization Development | `organization-development-jobs` |
| Learning & Development | `learning-and-development-jobs` |
| Compensation & Benefits | `compensation-benefits-jobs` |
| Industrial Relations | `industrial-relations-jobs` |
| HR Operations | `hr-operations-jobs` |
| HR Head | `hr-head-jobs` |
| IT Consulting (HR) | `it-consulting-jobs` |

</details>

<details>
<summary>IT & Systems (9 categories)</summary>

| Category | Slug |
|----------|------|
| IT Project Management | `it-project-management-jobs` |
| Presales | `presales-jobs` |
| IT Sales | `it-sales-jobs` |
| IT Product Management | `it-product-management-jobs` |
| IT Business Analyst | `it-business-analyst-jobs` |
| Functional Consultant | `functional-consultant-jobs` |
| IT Infrastructure | `it-infrastructure-jobs` |
| IT Audit | `it-audit-jobs` |
| Chief Technology Officer | `chief-technology-officer-jobs` |

</details>

<details>
<summary>Operations, Legal, BPO & Others (20+ categories)</summary>

| Category | Slug |
|----------|------|
| SCM & Operations | `scm-operations-jobs` |
| Supply Chain | `supply-chain-jobs` |
| Operations | `operations-jobs` |
| Procurement | `procurement-jobs` |
| Plant Operations | `plant-operations-jobs` |
| Demand Planning | `demand-planning-jobs` |
| Quality Operations | `quality-operations-jobs` |
| Operations Head | `operations-head-jobs` |
| Procurement Head | `procurement-head-jobs` |
| Legal | `legal-jobs` |
| Regulatory Compliance | `regulatory-compliance-jobs` |
| Litigation | `litigation-jobs` |
| Company Secretary | `company-secretary-jobs` |
| Intellectual Property Rights | `ipr-jobs` |
| Legal Head | `legal-head-jobs` |
| BPO | `bpo-jobs` |
| BPO Operations | `bpo-operations-jobs` |
| Customer Service | `customer-service-jobs` |
| BPO Head | `bpo-head-jobs` |
| GenAI | `genai-jobs` |
| Generative AI | `generative-ai-jobs` |
| Data Science | `data-science-jobs` |

</details>

## Output

Each job listing is returned as a JSON object with these fields:

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

Each page contains **50 job listings**. With the default `maxPages: 5`, you'll get up to **250 jobs** per run.

| maxPages | Jobs | Estimated run time |
|----------|------|-------------------|
| 1 | ~50 | ~15 seconds |
| 5 | ~250 | ~1 minute |
| 10 | ~500 | ~2 minutes |
| 20 | ~1,000 | ~4 minutes |

Run times include the 10-second crawl delay between pages to respect the site's robots.txt.

## How it works

1. **Discovery** — Fetches the listing page to extract the internal category ID from Next.js page data
2. **API extraction** — Calls the site's internal API with the category ID and your filters, paginating through results
3. **Output** — Pushes each structured job object to the Apify dataset

This approach is faster and more reliable than HTML scraping since the data comes directly from structured API responses.

## Use cases

- **Job market research** — Analyze hiring trends across industries, roles, and cities in India
- **Salary benchmarking** — Compare salary ranges across companies and experience levels
- **Talent intelligence** — Track which skills and certifications are in demand
- **Competitor monitoring** — Monitor hiring activity at specific companies
- **Lead generation** — Find companies actively hiring for specific roles
- **Career analytics** — Build dashboards on job market data for MBA/professional roles

## Integrations

Connect IIMJobs Scraper to other tools and services:

- **Google Sheets** — Export job data directly to a spreadsheet
- **Slack / Email** — Get notifications when new jobs match your criteria
- **Webhooks** — Send data to any URL on completion
- **Zapier / Make** — Automate workflows with scraped job data
- **APIs** — Access results programmatically via the Apify API

## Cost of usage

The actor uses minimal compute resources since it makes lightweight API calls instead of rendering pages in a browser. A typical run scraping 250 jobs (5 pages) costs less than **$0.01** in Apify platform credits.

## Limitations

- Only scrapes **public listing data** — job detail pages require login and are not scraped
- Salary data is only available when the employer chooses to disclose it
- Company names may show as "Confidential" for anonymized postings
- Location filter covers the 7 major metro cities; use Custom URL for other locations
