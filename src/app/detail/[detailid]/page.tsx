import Link from "next/link";
import { Suspense } from "react";


interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: Market[];
}

async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
            { cache: "no-store" }
        );

        if (!res.ok) return null;

        const result = await res.json();
        const product = result.data ?? result;

        if (!product || !product.id) return null;

        return product as Product;
    } catch {
        return null;
    }

}

function getUnit(unit: string) {
    const units: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        liter: "লিটার",
        piece: "টি",
        pcs: "টি",
        dozen: "ডজন",
    };

    return units[unit?.toLowerCase()] ?? unit;

}

function formatPrice(price: number) {
    return new Intl.NumberFormat("bn-BD").format(price);
}

async function ProductDetailsContent({
    params,
}: {
    params: Promise<{ detailid: string }>;
}) {
    const { detailid } = await params;
    const product = await getProduct(detailid);

    if (!product) {
        return (
            <main className="min-h-screen bg-[#f5f7f4] px-4 py-16">
                <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 text-center shadow-sm">
                    <h1 className="text-xl font-bold text-gray-800">
                        পণ্যটি খুঁজে পাওয়া যায়নি
                    </h1>
                    <Link
                        href="/"
                        className="mt-4 inline-block text-sm font-semibold text-green-700"
                    >
                        ← হোম পেজে ফিরে যাও
                    </Link>
                </div>
            </main>
        );
    }

    const unit = getUnit(product.unit);
    const markets = product.markets ?? [];

    const priceCards = [
        { label: "গতকাল", price: product.yesterday },
        { label: "গত সপ্তাহ", price: product.lastWeek },
        { label: "গত মাস", price: product.lastMonth },
    ];

    return (
        <main className="min-h-screen bg-[#f5f7f4] px-3 py-5 text-[#26352c] sm:px-5">
            <div className="mx-auto max-w-5xl">
                {/* Breadcrumb */}
                <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <Link href="/" className="hover:text-green-700">
                        হোম
                    </Link>
                    <span>›</span>
                    <Link
                        href={`/category/${product.category}`}
                        className="hover:text-green-700"
                    >
                        {product.categoryNameBn}
                    </Link>
                    <span>›</span>
                    <span className="text-gray-700">{product.nameBn}</span>
                </nav>

                {/* Product Header */}
                <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#e6ebe5] bg-white p-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
                            {product.image || product.categoryIcon || "🛒"}
                        </div>

                        <div>
                            <h1 className="text-lg font-bold sm:text-xl">
                                {product.nameBn}
                            </h1>
                            <p className="mt-1 text-xs text-gray-500">
                                {product.categoryNameBn} · {unit}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                বাংলাদেশের বিভিন্ন বাজারের দাম · টাকা
                            </p>
                        </div>
                    </div>

                    <div className="flex min-w-32 flex-col items-center justify-center rounded-xl bg-[#f0f5f0] px-5 py-3 sm:min-w-36">
                        <span className="text-xs text-gray-500">
                            আজকের দাম
                        </span>

                        <p className="mt-1 text-2xl font-bold">
                            ৳{formatPrice(product.today)}
                        </p>

                        <span className="mt-1 text-xs text-gray-500">
                            টাকা / {unit}
                        </span>

                        <p
                            className={`mt-1 text-xs font-semibold ${product.change.dir === "up"
                                    ? "text-red-600"
                                    : product.change.dir === "down"
                                        ? "text-green-700"
                                        : "text-gray-500"
                                }`}
                        >
                            {product.change.dir === "up"
                                ? "▲"
                                : product.change.dir === "down"
                                    ? "▼"
                                    : "—"}{" "}
                            {formatPrice(Math.abs(product.change.pct))}%
                        </p>
                    </div>
                </section>

                {/* Price Comparison */}
                <section className="mt-3 rounded-xl border border-[#e6ebe5] bg-white p-3 sm:p-4">
                    <h2 className="mb-3 text-sm font-bold">
                        দামের সময়ভিত্তিক তুলনা
                    </h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {priceCards.map((item) => {
                            const difference = product.today - item.price;

                            return (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-[#e6ebe5] bg-[#fbfcfa] p-3"
                                >
                                    <p className="text-xs text-gray-500">
                                        {item.label}
                                    </p>

                                    <p className="mt-1 text-lg font-bold">
                                        ৳{formatPrice(item.price)}
                                    </p>

                                    <p
                                        className={`mt-1 text-xs ${difference > 0
                                                ? "text-red-600"
                                                : difference < 0
                                                    ? "text-green-700"
                                                    : "text-gray-500"
                                            }`}
                                    >
                                        {difference > 0
                                            ? `▲ আজ ৳${formatPrice(difference)} বেশি`
                                            : difference < 0
                                                ? `▼ আজ ৳${formatPrice(Math.abs(difference))} কম`
                                                : "দাম একই"}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Market Price Table */}
                <section className="mt-3 rounded-xl border border-[#e6ebe5] bg-white p-3 sm:p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-sm font-bold">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <span className="rounded-full bg-[#f0f5f0] px-3 py-1 text-xs text-gray-600">
                            {formatPrice(markets.length)}টি বাজার
                        </span>
                    </div>

                    {markets.length === 0 ? (
                        <p className="rounded-lg bg-[#f5f7f4] p-5 text-center text-sm text-gray-500">
                            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                        </p>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-[#e1e6df]">
                            <table className="w-full min-w-150 border-collapse text-left text-xs">
                                <thead className="bg-[#f8faf7] text-gray-600">
                                    <tr>
                                        <th className="px-3 py-3 font-semibold">
                                            বাজার
                                        </th>
                                        <th className="px-3 py-3 font-semibold">
                                            বিভাগ
                                        </th>
                                        <th className="px-3 py-3 text-right font-semibold">
                                            সর্বনিম্ন
                                        </th>
                                        <th className="px-3 py-3 text-right font-semibold">
                                            সর্বোচ্চ
                                        </th>
                                        <th className="px-3 py-3 text-right font-semibold">
                                            গড় দাম
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {markets.map((market, index) => (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className={
                                                index % 2 === 0
                                                    ? "bg-[#f0f5f0]"
                                                    : "bg-white"
                                            }
                                        >
                                            <td className="border-t border-[#dce3da] px-3 py-3 font-medium">
                                                {market.market}
                                            </td>

                                            <td className="border-t border-[#dce3da] px-3 py-3">
                                                {market.division}
                                            </td>

                                            <td className="border-t border-[#dce3da] px-3 py-3 text-right">
                                                ৳{formatPrice(market.min)}
                                            </td>

                                            <td className="border-t border-[#dce3da] px-3 py-3 text-right">
                                                ৳{formatPrice(market.max)}
                                            </td>

                                            <td className="border-t border-[#dce3da] px-3 py-3 text-right font-semibold">
                                                ৳
                                                {formatPrice(
                                                    (market.min + market.max) / 2
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <p className="mt-3 text-xs text-gray-500">
                        * গড় দাম সর্বনিম্ন ও সর্বোচ্চ দামের গাণিতিক গড়।
                        দাম টাকা / {unit} হিসেবে দেখানো হয়েছে।
                    </p>
                </section>

                <div className="py-5 text-center">
                    <Link
                        href={`/category/${product.category}`}
                        className="text-sm font-semibold text-green-700 hover:underline"
                    >
                        ← {product.categoryNameBn} ক্যাটাগরিতে ফিরে যাও
                    </Link>
                </div>
            </div>
        </main>
    );

}

export default function ProductDetailsPage({
    params,
}: {
    params: Promise<{ detailid: string }>;
}) {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-[#f5f7f4] px-4 py-16">
                    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 text-center shadow-sm">
                        <p className="text-sm text-gray-600">
                            পণ্যের তথ্য লোড হচ্ছে...
                        </p>
                    </div>
                </main>
            }
        >
            <ProductDetailsContent params={params} />
        </Suspense>
    );
}
