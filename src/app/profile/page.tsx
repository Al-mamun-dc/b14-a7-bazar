"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    const currentName = user?.name || "";

    if (isPending) {
        return (
            <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
                <div className="mx-auto max-w-115">
                    <p className="text-sm text-gray-500">Loading...</p>
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
                <div className="mx-auto max-w-115">
                    <h1 className="text-[22px] font-bold text-[#202a22]">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        প্রোফাইল দেখতে প্রথমে লগইন করুন।
                    </p>

                    <button
                        type="button"
                        onClick={() => router.push("/signin")}
                        className="mt-4 rounded-lg bg-[#078b43] px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
                    >
                        সাইন ইন
                    </button>
                </div>
            </main>
        );
    }

    const handleUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const updatedName = name.trim();

        if (!updatedName) {
            toast.error("নাম লিখুন।");
            return;
        }

        if (updatedName === currentName) {
            toast.info("নামে কোনো পরিবর্তন করা হয়নি।");
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.updateUser({
                name: updatedName,
            });

            if (error) {
                toast.error(
                    error.message || "নাম আপডেট করা যায়নি।"
                );
                return;
            }

            setName(updatedName);

            toast.success("নাম সফলভাবে আপডেট হয়েছে!");

            await authClient.getSession();
            router.refresh();
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("নাম আপডেট করতে সমস্যা হয়েছে।");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            setSigningOut(true);

            const { error } = await authClient.signOut();

            if (error) {
                toast.error(
                    error.message || "সাইন আউট করা যায়নি।"
                );
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে!");

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out error:", error);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
        } finally {
            setSigningOut(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
            <div className="mx-auto max-w-115">
                {/* Profile Heading */}
                <h1 className="text-[22px] font-bold text-[#202a22]">
                    আমার প্রোফাইল
                </h1>

                <p className="mb-5 mt-1 text-xs text-gray-500">
                    আপনার অ্যাকাউন্টের তথ্য দেখুন
                </p>

                {/* Profile Card */}
                <div className="mb-4 flex items-center gap-3 rounded-xl border border-[#e1e9e1] bg-[#fafcf9] p-4">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt="Profile"
                            width={48}
                            height={48}
                            className="h-12 w-12 shrink-0 rounded-xl object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e5eee5] font-bold text-green-800">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-sm font-semibold text-[#26352c]">
                            {user.name || "ব্যবহারকারী"}
                        </h2>

                        <p className="truncate text-xs text-gray-500">
                            {user.email}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="shrink-0 rounded-md border border-red-300 px-2.5 py-1.5 text-[11px] text-red-500 transition hover:bg-red-50 disabled:opacity-60"
                    >
                        {signingOut ? "অপেক্ষা করুন..." : "↪ সাইন আউট"}
                    </button>
                </div>

                {/* Update Information Form */}
                <form
                    onSubmit={handleUpdate}
                    className="rounded-xl border border-[#e1e9e1] bg-[#fafcf9] p-4"
                >
                    <h2 className="mb-5 text-sm font-bold text-[#26352c]">
                        তথ্য
                    </h2>

                    <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs text-[#26352c]"
                    >
                        নাম
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name || currentName}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="আপনার নাম লিখুন"
                        className="h-8 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-xs outline-none transition focus:border-green-700"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-3 h-8 w-full rounded-lg bg-[#078b43] text-xs font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default ProfilePage;