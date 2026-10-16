"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const Navlink = () => {
    const pathname = usePathname();

    const [data, setData] = useState<Category[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(
                    "https://openapi.programming-hero.com/api/bazardor/categories"
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const categories: Category[] = await res.json();
                setData(categories);
            } catch (error) {
                console.error("Category fetch error:", error);
            }
        };

        getCategories();
    }, []);

    return (
        <div className="w-full border-y border-gray-100">
            <div className="mx-auto max-w-7xl px-5">
                <div className="flex items-center gap-1 overflow-x-auto py-2">
                    {data.map((item) => {
                        const isActive =
                            pathname === `/category/${item.slug}`;

                        return (
                            <Link
                                key={item.id}
                                href={`/category/${item.slug}`}
                                className={`flex shrink-0 flex-row items-center gap-1 rounded-md px-3 py-2 text-sm transition ${
                                    isActive
                                        ? "bg-green-600 text-white"
                                        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                                }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.nameBn}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Navlink;