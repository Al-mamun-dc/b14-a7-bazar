"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Product {
id: number;
nameBn: string;
image: string;
category: string;
categoryNameBn: string;
unit: string;
today: number;
change: {
dir: "up" | "down" | "flat";
pct: number;
};
}

interface Props {
products: Product[];
}

const getUnit = (unit: string) => {
const units: Record<string, string> = {
kg: "প্রতি কেজি",
litre: "প্রতি লিটার",
liter: "প্রতি লিটার",
dozen: "প্রতি ডজন",
piece: "প্রতি পিস",
pcs: "প্রতি পিস",
};

return units[(unit ?? "").toLowerCase()] ?? `প্রতি ${unit}`;

};

export default function CategoryProductList({ products }: Props) {
const [sort, setSort] = useState("default");

const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
    return 0;
});

return (
    <>
        <div className="mb-4 flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <label htmlFor="sort" className="text-xs text-gray-500">
                সাজান
            </label>

            <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-700 outline-none focus:border-green-500"
            >
                <option value="default">ডিফল্ট</option>
                <option value="low">দাম: কম থেকে বেশি</option>
                <option value="high">দাম: বেশি থেকে কম</option>
            </select>
        </div>

        {sortedProducts.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
                <p className="text-gray-500">
                    এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
                </p>

                <Link
                    href="/"
                    className="mt-4 inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedProducts.map((item) => (
                    <Link
                        key={item.id}
                       href={`/detail/${item.id}`}
                        className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-green-300 hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-50 text-2xl">
                                {item.image || "🛒"}
                            </div>

                            <div className="min-w-0">
                                <h2 className="font-semibold text-gray-800">
                                    {item.nameBn}
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    {getUnit(item.unit)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-2">
                            <div>
                                <p className="text-xs text-gray-500">
                                    আজকের দাম
                                </p>

                                <p className="mt-1 font-bold text-gray-900">
                                    {item.today.toLocaleString("bn-BD")} টাকা
                                </p>
                            </div>

                            <span
                                className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
                                    item.change.dir === "up"
                                        ? "bg-green-50 text-green-600"
                                        : item.change.dir === "down"
                                        ? "bg-red-50 text-red-600"
                                        : "bg-gray-100 text-gray-500"
                                }`}
                            >
                                {item.change.dir === "up"
                                    ? "▲ "
                                    : item.change.dir === "down"
                                    ? "▼ "
                                    : "—"}
                                {Math.abs(item.change.pct).toLocaleString(
                                    "bn-BD",
                                    {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                    }
                                )}
                                %
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </>
);

}