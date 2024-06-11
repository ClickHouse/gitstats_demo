import GithubStats from "@/components/GithubStats";
import Search from "@/components/Search";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default async function Package({ params }) {
  return (
    <div>
      <main>
        <div className="items-start flex">
          <Search package_name={params.package_name} />
        </div>
        <Suspense key={params.package_name} fallback={<Loading />}>
          <GithubStats package_name={params.package_name} />
        </Suspense>
      </main>
    </div>
  );
}
