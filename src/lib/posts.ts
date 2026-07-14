import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  linkedInUrl: string;
  author: string;
  companionSlug: string;
}

export interface Post extends PostMeta {
  content: string;
  contentHtml: string;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 250;
  const words = content.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
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
    return tags.filter((tag): tag is string => typeof tag === 'string');
  }

  if (typeof tags === 'string') {
    return [tags];
  }

  return [];
}

function normalizeDate(date: unknown): string {
  if (!date) return '';

  if (date instanceof Date) {
    return date.toISOString();
  }

  return String(date);
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const filePath = getPostFilePath(slug);
    if (!filePath) return null;

    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    return {
      slug,
      title: String(data.title || slug),
      date: normalizeDate(data.date),
      excerpt: String(data.excerpt || ''),
      category: String(data.category || 'Uncategorized'),
      tags: normalizeTags(data.tags),
      readingTime: calculateReadingTime(content),
      featured: Boolean(data.featured),
      linkedInUrl: String(data.linkedInUrl || ''),
      author: String(data.author || ''),
      companionSlug: String(data.companionSlug || ''),
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  const posts = getAllPostSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((post): post is PostMeta => post !== null);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllPosts().map((post) => post.category));

  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const tags = new Set(getAllPosts().flatMap((post) => post.tags));

  return Array.from(tags).sort();
}

export function getCompanionPost(post: PostMeta): PostMeta | null {
  if (!post.companionSlug) return null;

  return getPostMeta(post.companionSlug);
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const filePath = getPostFilePath(slug);
    if (!filePath) return null;

    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const processed = await remark().use(html).process(content);
    const contentHtml = processed.toString();

    return {
      slug,
      title: String(data.title || slug),
      date: normalizeDate(data.date),
      excerpt: String(data.excerpt || ''),
      category: String(data.category || 'Uncategorized'),
      tags: normalizeTags(data.tags),
      readingTime: calculateReadingTime(content),
      featured: Boolean(data.featured),
      linkedInUrl: String(data.linkedInUrl || ''),
      author: String(data.author || ''),
      companionSlug: String(data.companionSlug || ''),
      content,
      contentHtml,
    };
  } catch {
    return null;
  }
}
