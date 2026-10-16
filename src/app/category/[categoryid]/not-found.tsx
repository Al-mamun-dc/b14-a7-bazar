
import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <div className="text-5xl">🔎</div>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          আপনি যে ক্যাটাগরিটি খুঁজছেন, সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
