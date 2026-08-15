import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛠️</span>
          <span className="font-bold text-xl text-gray-900 dark:text-white">OnlineTools</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition">
            Home
          </Link>
          <Link href="/?category=developer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition">
            Developer
          </Link>
          <Link href="/?category=content" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition">
            Content
          </Link>
          <Link href="/?category=image" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition">
            Image
          </Link>
          <Link href="/?category=converter" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition">
            Converter
          </Link>
        </nav>

        <div className="md:hidden">
          <Link href="/" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
