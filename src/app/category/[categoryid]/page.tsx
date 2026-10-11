import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryProductList from "./CategoryProductList";

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

interface Category {
id: string;
slug: string;
nameBn: string;
icon: string;
}

interface PageProps {
params: Promise<{
categoryid: string;
}>;
}

async function CategoryContent({ params }: PageProps) {
const { categoryid } = await params;

const [categoryRes, productRes] = await Promise.all([
    fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
        cache: "no-store",
    }),
    fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryid)}`,
        { cache: "no-store" }
    ),
]);

if (!categoryRes.ok || !productRes.ok) {
    throw new Error("Failed to fetch category data");
}

const categories: Category[] = await categoryRes.json();
const products: Product[] = await productRes.json();

const category = categories.find(
    (item) => item.slug === categoryid
);

if (!category) {
    notFound();
}

return (
    <main className="mx-auto min-h-screen max-w-7xl bg-gray-50 px-4 py-8">
        <div className="mb-6">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
            </h1>

            <p className="mt-2 text-sm text-gray-500">
                এই বিভাগের সব পণ্যের বর্তমান বাজারদর দেখুন।
            </p>
        </div>

        <CategoryProductList products={products} />
    </main>
);

}

export default function CategoryDetails({ params }: PageProps) {
return (
<Suspense
fallback={
<p className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-500">
পণ্যের তথ্য লোড হচ্ছে...
</p>
}
>
<CategoryContent params={params} />
</Suspense>
);
}