export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <p className="mb-6 text-sm text-gray-500">
                পণ্যের তথ্য লোড হচ্ছে...
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-gray-200" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-3/4 rounded bg-gray-200" />
                                <div className="h-3 w-1/2 rounded bg-gray-200" />
                            </div>
                        </div>

                        <div className="mt-5 h-5 w-2/3 rounded bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>
    );
}