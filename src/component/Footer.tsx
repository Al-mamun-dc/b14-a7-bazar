
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white px-4 py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 text-[10px] text-gray-600 sm:flex-row sm:items-center sm:gap-4">
        <p>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}