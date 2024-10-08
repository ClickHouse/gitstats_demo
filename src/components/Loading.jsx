import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="absolute inset-0">
      <div className="grid place-items-center h-full w-full">
        <div className="flex gap-4">
          <Image src="/loading.svg" width={36} height={36} alt="loading-icon" />
          <span>Loading</span>
        </div>
      </div>
    </div>
  );
}
