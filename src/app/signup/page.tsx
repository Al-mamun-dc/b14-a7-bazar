
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const confirmPassword = String(
            formData.get("confirmPassword") ?? ""
        );

        if (password !== confirmPassword) {
            toast.error("দুটি পাসওয়ার্ড মেলেনি।");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                console.error("Signup error:", error);
                toast.error(
                    error.message || "সাইন আপ করা যায়নি।"
                );
                return;
            }

            if (data) {
                toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!");

                form.reset();

                router.push("/signin");
                router.refresh();
            }
        } catch (error) {
            console.error("Signup request failed:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "সমস্যা হয়েছে। আবার চেষ্টা করো।"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const data = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
            console.log(data);
        } catch (error) {
            console.error("Google login error:", error);
            toast.error("Google দিয়ে চালিয়ে যাওয়া যায়নি।");
        }
    };

    const handleGithubSignIn = async () => {
        try {
            const data = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
            console.log(data);
        } catch (error) {
            console.error("GitHub login error:", error);
            toast.error("GitHub দিয়ে চালিয়ে যাওয়া যায়নি।");
        }
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-6">
            <div className="mx-auto w-full max-w-66">
                <div className="mb-5 text-center">
                    <h1 className="text-[22px] font-bold leading-8 text-[#202a22]">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-1 text-xs text-gray-500">
                        বিনামূল্যে সাইন আপ করে সব পরিবর্তিত দাম দেখুন।
                    </p>
                </div>

                <form
                    className="space-y-3 rounded-xl border border-[#e1e9e1] bg-[#fafcf9] p-4"
                    onSubmit={onSubmit}
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-xs font-medium text-[#26352c]"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="যেমন: রহিম উদ্দিন"
                            required
                            autoComplete="name"
                            className="h-8 w-full rounded-lg border border-[#dfe7df] bg-transparent px-2.5 text-xs text-gray-800 outline-none focus:border-green-700"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-xs font-medium text-[#26352c]"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            autoComplete="username"
                            className="h-8 w-full rounded-lg border border-[#dfe7df] bg-transparent px-2.5 text-xs text-gray-800 outline-none focus:border-green-700"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-xs font-medium text-[#26352c]"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            minLength={8}
                            required
                            autoComplete="new-password"
                            className="h-8 w-full rounded-lg border border-[#dfe7df] bg-transparent px-2.5 text-xs text-gray-800 outline-none focus:border-green-700"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-1 block text-xs font-medium text-[#26352c]"
                        >
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="আবার লিখুন"
                            minLength={8}
                            required
                            autoComplete="new-password"
                            className="h-8 w-full rounded-lg border border-[#dfe7df] bg-transparent px-2.5 text-xs text-gray-800 outline-none focus:border-green-700"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="h-8 w-full rounded-lg bg-[#078b43] text-xs font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                            : "অ্যাকাউন্ট তৈরি করুন"}
                    </button>

                    <div className="flex items-center gap-3 py-0.5">
                        <div className="h-px flex-1 bg-[#dfe5df]" />

                        <span className="text-[10px] text-gray-500">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-[#dfe5df]" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="flex h-8.5 items-center justify-center gap-1 rounded-md border border-[#e0e7e0] bg-transparent px-1 text-[10px] font-medium text-[#26352c] transition hover:bg-[#f0f5f0]"
                        >
                            <svg
                                viewBox="0 0 48 48"
                                className="h-3 w-3 shrink-0"
                                aria-hidden="true"
                            >
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 37.96 46.98 31.84 46.98 24.55Z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
                                />
                            </svg>

                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            type="button"
                            onClick={handleGithubSignIn}
                            className="flex h-8.5 items-center justify-center gap-1 rounded-md border border-[#e0e7e0] bg-transparent px-1 text-[10px] font-medium text-[#26352c] transition hover:bg-[#f0f5f0]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-3 w-3 shrink-0"
                                aria-hidden="true"
                            >
                                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.28-2.61 5.22-5.1 5.5.4.35.75 1.02.75 2.06V22c0 .29.2.63.76.53A11.1 11.1 0 0 0 12 .9Z" />
                            </svg>

                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <p className="text-center text-[10px] text-gray-600">
                        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/signin"
                            className="font-semibold text-green-700 hover:underline"
                        >
                            লগইন করুন
                        </Link>
                    </p>
                </form>

                <div className="mt-4 text-center">
                    <Link
                        href="/"
                        className="text-[10px] text-gray-500 transition hover:text-green-700"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default SignUpPage;
