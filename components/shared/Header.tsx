import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛠️</span>
          <span className="font-bold text-xl text-gray-900 dark:text-white">OnlineTools</span>
        </Link>

      </div>
    </header>
  );
}
