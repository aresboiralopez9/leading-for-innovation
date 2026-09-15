import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export type PostLanguage = 'en' | 'es' | 'ca';

export interface PostTranslation {
  title: string;
  excerpt: string;
  body: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  featuredImage: string;
  linkedInUrl: string;
  author: string;
  companionSlug: string;
  translations: {
    spanish?: PostTranslation;
    catalan?: PostTranslation;
  };
}

export interface Post extends PostMeta {
  content: string;
  contentHtml: string;
  language: PostLanguage;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 250;
  const words = content.trim().split(/\s+/).filter(Boolean);

  return Math.max(1, Math.ceil(words.length / wordsPerMinute));
}

function getPostFilePath(slug: string): string | null {
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);

  if (fs.existsSync(mdPath)) return mdPath;
  if (fs.existsSync(mdxPath)) return mdxPath;

  return null;
}

function normalizeTags(tags: unknown): string[] {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags.filter(
      (tag): tag is string => typeof tag === 'string'
    );
  }

  if (typeof tags === 'string') return [tags];

  return [];
}

function normalizeDate(date: unknown): string {
  if (!date) return '';

  if (date instanceof Date) {
    return date.toISOString();
  }

  return String(date);
}

function normalizeFeaturedImage(image: unknown): string {
  if (!image) return '';

  return String(image);
}

function normalizeTranslation(
  translation: unknown
): PostTranslation | undefined {
  if (!translation || typeof translation !== 'object') {
    return undefined;
  }

  const value = translation as Record<string, unknown>;

  const title =
    typeof value.title === 'string' ? value.title : '';

  const excerpt =
    typeof value.excerpt === 'string' ? value.excerpt : '';

  const body =
    typeof value.body === 'string' ? value.body : '';

  if (!title && !excerpt && !body) {
    return undefined;
  }

  return {
    title,
    excerpt,
    body,
  };
}

function getTranslation(
  data: Record<string, unknown>,
  language: PostLanguage
): PostTranslation | undefined {
  const translations = data.translations;

  if (!translations || typeof translations !== 'object') {
    return undefined;
  }

  const translationData =
    translations as Record<string, unknown>;

  if (language === 'es') {
    return normalizeTranslation(translationData.spanish);
  }

  if (language === 'ca') {
    return normalizeTranslation(translationData.catalan);
  }

  return undefined;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter(
      (file) =>
        file.endsWith('.md') || file.endsWith('.mdx')
    )
    .map((file) => file.replace(/\.mdx?$/, ''));
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const filePath = getPostFilePath(slug);

    if (!filePath) return null;

    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    const translations =
      data.translations &&
      typeof data.translations === 'object'
        ? (data.translations as Record<string, unknown>)
        : {};

    return {
      slug,
      title: String(data.title || slug),
      date: normalizeDate(data.date),
      excerpt: String(data.excerpt || ''),
      category: String(
        data.category || 'Uncategorized'
      ),
      tags: normalizeTags(data.tags),
      readingTime: calculateReadingTime(content),
      featured: Boolean(data.featured),
      featuredImage: normalizeFeaturedImage(
        data.featuredImage
      ),
      linkedInUrl: String(
        data.linkedInUrl || ''
      ),
      author: String(data.author || ''),
      companionSlug: String(
        data.companionSlug || ''
      ),
      translations: {
        spanish: normalizeTranslation(
          translations.spanish
        ),
        catalan: normalizeTranslation(
          translations.catalan
        ),
      },
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  const posts = getAllPostSlugs()
    .map((slug) => getPostMeta(slug))
    .filter(
      (post): post is PostMeta => post !== null
    );

  return posts.sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter(
    (post) => post.featured
  );
}

export function getPostsByCategory(
  category: string
): PostMeta[] {
  return getAllPosts().filter(
    (post) =>
      post.category.toLowerCase() ===
      category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  return Array.from(
    new Set(
      getAllPosts().map(
        (post) => post.category
      )
    )
  ).sort();
}

export function getAllTags(): string[] {
  return Array.from(
    new Set(
      getAllPosts().flatMap(
        (post) => post.tags
      )
    )
  ).sort();
}

export function getCompanionPost(
  post: PostMeta
): PostMeta | null {
  if (!post.companionSlug) return null;

  return getPostMeta(
    post.companionSlug
  );
}

export async function getPost(
  slug: string,
  language: PostLanguage = 'en'
): Promise<Post | null> {
  try {
    const filePath = getPostFilePath(slug);

    if (!filePath) return null;

    const raw = fs.readFileSync(
      filePath,
      'utf8'
    );

    const { data, content } = matter(raw);

    let selectedTitle = String(
      data.title || slug
    );

    let selectedExcerpt = String(
      data.excerpt || ''
    );

    let selectedContent = content;

    if (language !== 'en') {
      const translation = getTranslation(
        data,
        language
      );

      if (translation) {
        if (translation.title) {
          selectedTitle =
            translation.title;
        }

        if (translation.excerpt) {
          selectedExcerpt =
            translation.excerpt;
        }

        if (translation.body) {
          selectedContent =
            translation.body;
        }
      }
    }

    const processed =
      await remark()
        .use(html)
        .process(selectedContent);

    const contentHtml =
      processed.toString();

    const translations =
      data.translations &&
      typeof data.translations === 'object'
        ? (data.translations as Record<string, unknown>)
        : {};

    return {
      slug,
      title: selectedTitle,
      date: normalizeDate(data.date),
      excerpt: selectedExcerpt,
      category: String(
        data.category || 'Uncategorized'
      ),
      tags: normalizeTags(data.tags),
      readingTime:
        calculateReadingTime(
          selectedContent
        ),
      featured: Boolean(
        data.featured
      ),
      featuredImage:
        normalizeFeaturedImage(
          data.featuredImage
        ),
      linkedInUrl: String(
        data.linkedInUrl || ''
      ),
      author: String(
        data.author || ''
      ),
      companionSlug: String(
        data.companionSlug || ''
      ),
      translations: {
        spanish: normalizeTranslation(
          translations.spanish
        ),
        catalan: normalizeTranslation(
          translations.catalan
        ),
      },
      content: selectedContent,
      contentHtml,
      language,
    };
  } catch {
    return null;
  }
}
