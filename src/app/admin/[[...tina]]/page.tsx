"use client";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center p-8 max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="text-6xl mb-6">✏️</div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
          Leading for Innovation
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm font-semibold uppercase tracking-wider">
          Content Editor
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed">
          To write or edit posts, run the blog locally on your computer. 
          The visual editor will be available at{" "}
          <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 text-xs">
            localhost:3000/admin
          </code>
        </p>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-left mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Run this command:</p>
          <code className="text-sm text-green-600 dark:text-green-400 font-mono">
            npm run dev
          </code>
        </div>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          ← Back to Blog
        </a>
      </div>
    </div>
  );
}
