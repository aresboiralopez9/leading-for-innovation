"use client";
import { TinaProvider, TinaCMS } from "tinacms";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8 max-w-md">
        <div className="text-6xl mb-6">✏️</div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
          Content Editor
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">
          The Tina CMS editor loads when running locally with{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400 text-xs">
            npm run dev
          </code>
          . In production, use{" "}
          <strong>Tina Cloud</strong> to enable the visual editor online.
        </p>
        <a
          href="https://app.tina.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
        >
          Set up Tina Cloud →
        </a>
      </div>
    </div>
  );
}
