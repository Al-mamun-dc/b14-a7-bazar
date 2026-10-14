"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Useinfo = () => {
    const router = useRouter();
    const session = authClient.useSession();
    const user = session.data?.user;


    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);

            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "লগআউট করা যায়নি।");
                return;
            }

            setIsOpen(false);
            toast.success("সফলভাবে লগআউট হয়েছে!");

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("লগআউট করতে সমস্যা হয়েছে।");
        } finally {
            setLoading(false);
        }
    };

    if (session.isPending) {
        return (
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-200" />
                <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
            </div>
        );
    }

    return (
        <div>
            {user ? (
                <div className="relative">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/profile"
                            aria-label="আমার প্রোফাইল"
                            className="shrink-0"
                        >
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-12 rounded-2xl ring-2 ring-offset-2">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "User"}
                                            width={48}
                                            height={48}
                                            className="h-12 w-12 rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5eee5] font-bold text-green-800">
                                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-label="প্রোফাইল মেনু"
                            aria-expanded={isOpen}
                            className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-gray-100"
                        >
                            <span className="max-w-32 truncate text-xl font-medium text-[#26352c]">
                                {user.name || "User"}
                            </span>

                            <span className="text-xs text-gray-500">
                                {isOpen ? "▲" : "▼"}
                            </span>
                        </button>
                    </div>

                    {isOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                            <p className="truncate px-3 py-2 text-sm text-gray-500">
                                {user.email}
                            </p>

                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="block rounded-md px-3 py-2 text-sm text-[#26352c] transition hover:bg-gray-100"
                            >
                                আমার প্রোফাইল
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={loading}
                                className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "লগআউট হচ্ছে..." : "লগআউট"}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-1">
                    <Link
                        href="/signin"
                        className="px-4 py-2 text-sm font-medium text-[#333333] transition hover:text-[#079447]"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-md bg-[#079447] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#067b3b]"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Useinfo;