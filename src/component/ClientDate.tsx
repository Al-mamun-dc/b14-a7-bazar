"use client";

import dynamic from "next/dynamic";

const DateDisplay = dynamic(() => import("./DateDisplay"), {
  ssr: false,
  loading: () => <p className="text-xs text-gray-500">তারিখ লোড হচ্ছে...</p>,
});

export default function ClientDate() {
  return <DateDisplay />;
}