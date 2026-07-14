import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  readingTime: number
  featured?: boolean
  linkedInUrl?: string
  author?: string
  companionSlug?: string
}

export interface Post extends PostMeta {
  content: string
  contentHtml: string
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 250
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''))
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs()

  const posts = slugs
    .map((slug) => getPostMeta(slug))
    .filter(Boolean) as PostMeta[]

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter((post) => post.featured)
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap((post) => post.tags))
  return Array.from(tags).sort()
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const mdPath = path.join(postsDirectory, `${slug}.md`)
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
    const filePath = fs.existsSync(mdPath) ? mdPath : mdxPath

    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      readingTime: calculateReadingTime(content),
      featured: data.featured || false, '',
      linkedInUrl: data.linkedInUrl || '',
      author: data.author || '',
      companionSlug: data.companionSlug || '',
    }
  } catch {
    return null
  }
}

export function getCompanionPost(post: PostMeta): PostMeta | null {
  if (!post.companionSlug) return null
  return getPostMeta(post.companionSlug)
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const mdPath = path.join(postsDirectory, `${slug}.md`)
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
    const filePath = fs.existsSync(mdPath) ? mdPath : mdxPath

    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)

    const processed = await remark().use(html).process(content)
    const contentHtml = processed.toString()

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      readingTime: calculateReadingTime(content),
      featured: data.featured || false, '',
      linkedInUrl: data.linkedInUrl || '',
      author: data.author || '',
      companionSlug: data.companionSlug || '',
      content,
      contentHtml,
    }
  } catch {
    return null
  }
}
