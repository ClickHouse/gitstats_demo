"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search({ package_name = "" }) {
  const [query, setQuery] = useState(package_name);
  const router = useRouter();

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      router.push(`/${e.target.value}`);
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      placeholder="Enter package name"
      className="border p-2 text-black rounded-md bg-neutral-725 items-center outline-none placeholder:tracking-wide placeholder:font-light
              hover:placeholder:text-neutral-0 font-normal text-neutral-400
							hover:text-neutral-0 focus:text-neutral-0 placeholder:text-neutral-400
							cursor-pointer border box-border hover:border-neutral-700 border-slate-700
							hover:border-opacity-50 transition-all duration-300 ease-in-out h-[50px] mb-4"
      onKeyDown={(e) => {
        onKeyDown(e);
      }}
    />
  );
}
