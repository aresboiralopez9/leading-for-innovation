export interface Author {
  id: string
  name: string
  role: string
  /** Short one-liner, used in bylines and post-card context */
  bio: string
  /** Longer bio for the individual /about/[author] page. Falls back to `bio` if omitted. */
  longBio?: string
  /** Path under /public, e.g. '/authors/ares.jpg'. Leave empty to show initials instead. */
  photo: string
  linkedInUrl: string
  /** Tailwind background class used for the initials fallback avatar */
  color: string
  initials: string
}

// TODO: swap in real photos, LinkedIn URLs, and bios for each of you.
export const authors: Record<string, Author> = {
  ares: {
    id: 'ares',
    name: 'Ares',
    role: 'Co-founder',
    bio: 'Writes on systems, organizational design, and turning research into repeatable practice.',
    longBio:
      'Ares focuses on the structural side of innovation — how teams are organized, how decisions actually get made, and where research on organizational design gets misapplied in practice. His pieces tend to start from a system and work down to what a manager should do differently on Monday.',
    photo: '/authors/ares.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/aresboiralopez/',
    color: 'bg-lfi-blue',
    initials: 'A',
  },
  sam: {
    id: 'sam',
    name: 'Sam',
    role: 'Co-founder',
    bio: 'Writes on creativity, team performance, and challenging conventional wisdom.',
    longBio:
      'Sam focuses on the human side of innovation — creativity, motivation, and the everyday habits that make or break a team\u2019s ability to do original work. His pieces tend to start from a misconception and work up to a concrete method for fixing it.',
    photo: '/authors/sam.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/samsurname/',
    color: 'bg-lfi-green',
    initials: 'S',
  },
}

export function getAuthor(id?: string): Author | null {
  if (!id) return null
  return authors[id] || null
}

export function getAllAuthors(): Author[] {
  return Object.values(authors)
}
