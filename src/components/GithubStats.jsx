import React from "react";
import SimpleStat from "@/components/SimpleStat";
import PackageDetails from "@/components/PackageDetails";

async function runAPIEndpoint(endpoint, params) {
  const data = {
    queryVariables: params,
    format: "JSONEachRow",
  };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${process.env.API_KEY_ID}:${process.env.API_KEY_SECRET}`)}`,
    },
    body: JSON.stringify(data),
  });
  
  return response.json().then(data=> {
    return data;
  }).catch(e => {
    return {}
  })
}

async function getGithubStats(package_name) {
  const stats = await runAPIEndpoint(process.env.GITHUB_STATS_API, {
    package_name: package_name,
  });
  return stats;
}

export default async function GithubStats({ package_name }) {
  const stats = await getGithubStats(package_name);
  return (
    <div>
      {stats.name ? (
        <>
          <PackageDetails
            name={package_name}
            home_page={stats.home_page}
            author={stats.author}
            author_email={stats.author_email}
            license={stats.license}
            summary={stats.summary}
            github_link={stats.github}
            version={stats.max_version}
          />
          {stats.github_link != "" ? (
            <div className="flex h-full gap-4 flex-row flex-wrap xl:flex-nowrap mt-8">
              <div className="flex gap-4 w-full sm:flex-row flex-col">
                <SimpleStat
                  value={stats.stars}
                  subtitle={"# Github stars"}
                  logo={"/stars.svg"}
                />
                <SimpleStat
                  value={stats.prs}
                  subtitle={"# Pull requests"}
                  logo={"/prs.svg"}
                />
              </div>
              <div className="flex gap-4 w-full sm:flex-row flex-col">
                <SimpleStat
                  value={stats.issues}
                  subtitle={"# Issues"}
                  logo={"/issues.svg"}
                />
                <SimpleStat
                  value={stats.forks}
                  subtitle={"# Forks"}
                  logo={"/fork.svg"}
                />
              </div>
            </div>
          ) : (
            <div className="mt-4">
              {package_name} does not have a Github repository
            </div>
          )}
        </>
      ) : (
        <div>{package_name} is not a Python package</div>
      )}
    </div>
  );
}
