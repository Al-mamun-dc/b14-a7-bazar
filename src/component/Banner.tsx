import React from "react";
import Image from "next/image";
import ClientDate from "./ClientDate";

const Banner = () => {
    return (
        <section className="mx-auto mt-5 max-w-6xl px-4">
            <div className="flex min-h-45 items-center justify-between rounded-2xl border border-gray-200 bg-[#f9fcf9] px-8 py-6">
                {/* Left Side */}
                <div className="max-w-xl">
                    
                        <ClientDate/>
                    

                    <h1 className="text-2xl font-bold text-gray-900">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <a
                        href="#সব-পণ্য"
                        className="mt-4 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700 transition"
                    >
                        সব দাম দেখুন
                    </a>
                </div>

                {/* Right Side - Banner Image */}
                <div className="hidden sm:block">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজারের পণ্য"
                        width={160}
                        height={140}
                        className="w-full h-64"
                          loading="eager"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;