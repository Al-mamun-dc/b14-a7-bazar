
import { notFound } from "next/navigation";
import CategoryProductList from "./CategoryProductList";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  category: string;
  categoryNameBn: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface PageProps {
  params: Promise<{
    categoryid: string;
  }>;
}

// API থেকে array বের করা
function getArray<T>(result: unknown): T[] {
  if (Array.isArray(result)) {
    return result as T[];
  }

  if (result && typeof result === "object") {
    const response = result as {
      data?: unknown;
      products?: unknown;
      categories?: unknown;
    };

    if (Array.isArray(response.data)) {
      return response.data as T[];
    }

    if (response.data && typeof response.data === "object") {
      const nested = response.data as {
        products?: unknown;
        categories?: unknown;
      };

      if (Array.isArray(nested.products)) {
        return nested.products as T[];
      }

      if (Array.isArray(nested.categories)) {
        return nested.categories as T[];
      }
    }

    if (Array.isArray(response.products)) {
      return response.products as T[];
    }

    if (Array.isArray(response.categories)) {
      return response.categories as T[];
    }
  }

  return [];
}

async function CategoryContent({ params }: PageProps) {
  const { categoryid } = await params;

  const [categoryRes, productRes] = await Promise.all([
    fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      { cache: "no-store" }
    ),
    fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryid)}`,
      { cache: "no-store" }
    ),
  ]);

  if (!categoryRes.ok || !productRes.ok) {
    throw new Error("Failed to fetch category data");
  }

  const [categoryResult, productResult] = await Promise.all([
    categoryRes.json(),
    productRes.json(),
  ]);

  const categories = getArray<Category>(categoryResult);
  const products = getArray<Product>(productResult);

  const category = categories.find(
    (item) => item.slug === categoryid
  );

  // Invalid category হলে 404
  if (!category) {
    notFound();
  }

  // API থেকে শুধু এই category-র product রাখবে
  const categoryProducts = products.filter(
    (product) => product.category === category.slug
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            এই বিভাগের সব পণ্যের বর্তমান বাজারদর দেখুন।
          </p>
        </div>

        <CategoryProductList products={categoryProducts} />
      </div>
    </main>
  );
}

export default async function CategoryDetails({ params }: PageProps) {
  return <CategoryContent params={params} />;
}
