import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import React from "react";

interface Product {
    id: number;
    nameBn: string;
    image: string;
    today: number;
    unit: string;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

const Marquee = async () => {
   const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
        cache: "force-cache",
    }
);

    if (!res.ok) {
        throw new Error("Failed to fetch product prices");
    }

    const data: Product[] = await res.json();

    return (
        <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
            <MarqueeText direction="right">
                {data.map((item) => (
                    <span
                        key={item.id}
                        className="inline-flex shrink-0 items-center gap-1 border-r border-gray-200 px-4 py-2 text-xs whitespace-nowrap"
                    >
                        <span>{item.image ?? "🛒"}</span>

                        <span className="font-medium text-gray-700">
                            {item.nameBn}
                        </span>

                        <span className="text-gray-600">
                            ৳{item.today}/
                            {item.unit === "kg"
                                ? "কেজি"
                                : item.unit === "litre"
                                ? "লিটার"
                                : item.unit}
                        </span>

                        <span
                            className={
                                item.change.dir === "up"
                                    ? "font-semibold text-green-600"
                                    : item.change.dir === "down"
                                    ? "font-semibold text-red-600"
                                    : "font-semibold text-gray-500"
                            }
                        >
                            {item.change.dir === "up"
                                ? "▲"
                                : item.change.dir === "down"
                                ? "▼"
                                : "—"}{" "}
                            {Math.abs(item.change.pct)}%
                        </span>
                    </span>
                ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;