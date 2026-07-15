import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const authorsDirectory = path.join(process.cwd(), 'content', 'authors')

export interface Author {
  id: string
  name: string
  role: string
  bio: string
  longBio: string
  photo: string
  linkedInUrl: string
  color: string
  initials: string
}

function getAuthorFilePath(id: string): string | null {
  const mdPath = path.join(authorsDirectory, `${id}.md`)
  const mdxPath = path.join(authorsDirectory, `${id}.mdx`)

  if (fs.existsSync(mdPath)) return mdPath
  if (fs.existsSync(mdxPath)) return mdxPath

  return null
}

export function getAllAuthorIds(): string[] {
  if (!fs.existsSync(authorsDirectory)) return []

  return fs
    .readdirSync(authorsDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''))
}

export function getAuthor(id?: string): Author | null {
  if (!id) return null

  try {
    const filePath = getAuthorFilePath(id)
    if (!filePath) return null

    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)

    return {
      id,
      name: String(data.name || id),
      role: String(data.role || ''),
      bio: String(data.bio || ''),
      longBio: content.trim(),
      photo: String(data.photo || ''),
      linkedInUrl: String(data.linkedInUrl || ''),
      color: String(data.color || 'bg-lfi-blue'),
      initials: String(data.initials || ''),
    }
  } catch {
    return null
  }
}

export function getAllAuthors(): Author[] {
  return getAllAuthorIds()
    .map((id) => getAuthor(id))
    .filter((author): author is Author => author !== null)
}

export const authors: Record<string, Author> = Object.fromEntries(
  getAllAuthors().map((author) => [author.id, author])
)
