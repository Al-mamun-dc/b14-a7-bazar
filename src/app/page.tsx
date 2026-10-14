import Banner from "@/component/Banner";

import { Suspense } from "react";
import Link from "next/link";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const toBanglaNumber = (value: number | string) =>
  Number(value).toLocaleString("bn-BD");

const getUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
};

// Product Card Grid
const ProductGrid = ({
  products,
}: {
  products: Product[];
}) => {
  if (products.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((item) => (
        <Link
          key={item.id}
          href={`/detail/${item.id}`}
          className="rounded-xl border border-gray-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md sm:p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f5ef] text-xl">
              {item.image || "🛒"}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-gray-800">
                {item.nameBn}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {getUnit(item.unit)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-[11px] text-gray-500">
                আজকের দাম
              </p>

              <p className="mt-1 text-sm font-bold text-gray-900">
                {toBanglaNumber(item.today)} টাকা
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${item.change.dir === "up"
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

              {toBanglaNumber(
                Math.abs(item.change.pct).toFixed(1)
              )}
              %
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

// Fetch Products
const ProductSections = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  // Top 6 products whose prices increased
  const rising = [...data]
    .filter((item) => item.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 products whose prices decreased
  const falling = [...data]
    .filter((item) => item.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      {/* Price Increased */}
      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900">
          আজ দাম বেড়েছে <span className="text-green-600">▲</span>
        </h2>

        <ProductGrid products={rising} />
      </section>

      {/* Price Decreased */}
      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900">
          আজ দাম কমেছে <span className="text-red-600">▼</span>
        </h2>

        <ProductGrid products={falling} />
      </section>

      {/* All Products */}
      <section id="সব-পণ্য">
        <h2 className="text-base font-bold text-gray-900">
          সব পণ্য
        </h2>

        <p className="mb-4 mt-1 text-xs text-gray-500">
          নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর দেখুন।
        </p>

        <ProductGrid products={data} />
      </section>
    </main>
  );
};

// Home Page
export default function Home() {
  return (
    <div className="min-h-screen bg-[#f1f5ef]">
      <Suspense
        fallback={
          <p className="p-4 text-sm text-gray-500">
            বাজারদর লোড হচ্ছে...
          </p>
        }
      >
        
      </Suspense>

      <Banner />

      <Suspense
        fallback={
          <p className="p-4 text-sm text-gray-500">
            পণ্যের তথ্য লোড হচ্ছে...
          </p>
        }
      >
        <ProductSections />
      </Suspense>
    </div>
  );
}