# Github Stats Demo powered by ClickHouse

![Simple app image](./public/github_stats.png)

This repository provides a simple application to show off ClickHouse Cloud query endpoints by allowing users to search for any Python package and retrieve Github statistics. This uses over 7.5 billion rows in ClickHouse, thus demonstrating real-time analytics on large datasets.

For the accompanying blog post see [Adding Analytics to an Application in under 10 minutes with ClickHouse and Query Endpoints](https://clickhouse.com/blog/adding-analytics-to-an-application-in-under-10-minutes-with-ClickHouse-and-query-endpoints)

If you prefer to watch a video showing the steps to build this application, watch below:

// INSERT



## Pre-requisites

- >= node v20.9.0

## Getting started

### Signup to ClickHouse Cloud

This demo requires a ClickHouse Cloud account. Users can sign up [here](https://clickhouse.cloud/signup) and receive $300 of free credits - more than sufficient for this demo.

### Load the dataset

Create the supporting tables for this demo:

```sql

```

```sql


```

Load the dataset for each table:

```sql

```

### Create a query endpoint

Save the following query in ClickHouse Cloud SQL console and create an endpoint with a developer API token.

**Note down the the credentials for the token and subsequent HTTP endpoint.**

```sql
WITH
(
      SELECT version
      FROM pypi.projects
      WHERE name = {package_name:String}
      ORDER BY arrayMap(x -> toUInt8OrDefault(x, 0), splitByChar('.', version)) DESC
      LIMIT 1
) AS max_version,
project_details AS (
  SELECT
      name,
      max_version,
      summary,
      author,
      author_email,
      license,
      home_page,
      trim(TRAILING '/' FROM regexpExtract(arrayFilter(l -> (l LIKE '%https://github.com/%'), arrayConcat(project_urls, [home_page]))[1], '.*https://github.com/(.*)')) AS github
  FROM pypi.projects
  WHERE (name = {package_name:String})
  ORDER BY upload_time DESC
  LIMIT 1
),
id AS (
    SELECT repo_id
    FROM github.github_events
    WHERE repo_name IN (SELECT github FROM project_details) LIMIT 1
),
stats AS (
  SELECT
      uniqExactIf(actor_login, (event_type = 'WatchEvent') AND (action = 'started')) AS stars,
      uniqExactIf(number, event_type = 'IssuesEvent') AS issues,
      uniqExactIf(actor_login, event_type = 'ForkEvent') AS forks,
      uniqExactIf(number, event_type = 'PullRequestEvent') AS prs
  FROM github.github_events
  WHERE (repo_id IN id)
)
SELECT * FROM project_details, stats
```

![]()

### Update local credentials

Create a file `.env.local` in the root folder. Populate with the endpoint and API statistics recorded above e.g.

```bash
API_KEY_ID=NOjlcSJ1dA8U4ZBgCbEE
API_KEY_SECRET=5f1duHyIZKWtmr1aXFaMDWQo7yPGyRK0ybIAzp5gbN
GITHUB_STATS_API=https://console-api.clickhouse.cloud/.api/query-endpoints/cd8584b4-2223-4e52-bb44-66893d170123/run
```

### Running the app

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) and search for a Python package.

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
