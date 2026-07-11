export interface Author {
  id: string
  name: string
  role: string
  bio: string
  /** Path under /public, e.g. '/authors/ares.jpg'. Leave empty to show initials instead. */
  photo: string
  linkedInUrl: string
  /** Tailwind background class used for the initials fallback avatar */
  color: string
  initials: string
}

// TODO: swap in real photos, LinkedIn URLs, and one-line bios for each of you.
export const authors: Record<string, Author> = {
  ares: {
    id: 'ares',
    name: 'Ares',
    role: 'Co-founder',
    bio: 'Writes on systems, organizational design, and turning research into repeatable practice.',
    photo: '',
    linkedInUrl: 'https://www.linkedin.com/in/aresboiralopez/',
    color: 'bg-lfi-blue',
    initials: 'A',
  },
  sam: {
    id: 'sam',
    name: 'Sam',
    role: 'Co-founder',
    bio: 'Writes on creativity, team performance, and challenging conventional wisdom.',
    photo: '',
    linkedInUrl: 'https://www.linkedin.com/in/samsurname/',
    color: 'bg-lfi-green',
    initials: 'S',
  },
}

export function getAuthor(id?: string): Author | null {
  if (!id) return null
  return authors[id] || null
}
