
export default function HomeSkeleton() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse space-y-8 px-4 py-8 sm:px-6">
      {/* দাম বেড়েছে */}
      <section>
        <div className="mb-4 h-5 w-40 rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`up-${index}`}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-5 h-4 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>

      {/* দাম কমেছে */}
      <section>
        <div className="mb-4 h-5 w-40 rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`down-${index}`}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-5 h-4 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>

      {/* সব পণ্য */}
      <section>
        <div className="h-5 w-24 rounded bg-gray-200" />
        <div className="mb-4 mt-2 h-3 w-64 max-w-full rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`all-${index}`}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-5 h-4 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
