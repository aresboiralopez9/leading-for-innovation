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
    bio: 'Ares holds a Ph.D. in Industrial-Organizational Psychology from the University of Oklahoma, specializing in creativity and innovation. Based in Los Angeles, she works remotely as an Assistant Research Professor for the University of Nebraska Omaha, studying generative AI's role in creativity and researching tactical innovation within terrorist and cartel organizations to inform real-world countermeasures. Outside of work, she paints, writes, and cooks her way through her own creative pursuits, reads everything from biographies to fantasy, and is a devoted mum to her orange, chubby, old cat, Toni — yes, from The Sopranos.',
    longBio:
      'Ares holds a Ph.D. in Industrial-Organizational Psychology from the University of Oklahoma, where she specialized in creativity and innovation, with a dissertation exploring how expert cases and guidance can enhance creative thinking in non-experts. Originally from Spain and now based in Los Angeles, California, she brings that academic grounding to her current role as an Assistant Research Professor at the Center for Collaboration Science, NCITE, working remotely for the University of Nebraska Omaha. There, she designs and leads empirical studies on generative AI and creativity, turning her findings into actionable insights for government and FBI stakeholders through reports and congressional briefings. Her work also takes her into less conventional territory: studying tactical innovation within terrorist and cartel organizations to help inform real-world counter-strategies. What ties it all together is Ares's genuine fascination with creativity itself — how it emerges, how it can be nurtured, and how it can sometimes be turned toward harm — and her drive to make that understanding useful to the people and institutions who need it most. Outside of the office, Ares is always finding new ways to practice her own creativity, whether through painting, writing, or cooking. She reads everything from biographies to fantasy novels, is constantly planning her next trip to somewhere in nature (or back home to see family in Spain), and is a devoted mum to her orange, chubby, old cat, Toni (yes, from The Sopranos).',
    photo: '/authors/ares.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/aresboiralopez/',
    color: 'bg-lfi-blue',
    initials: 'A',
  },
  sam: {
    id: 'sam',
    name: 'Sam',
    role: 'Co-founder',
    bio: 'Sam holds a Ph.D. in Industrial-Organizational Psychology from the University of Oklahoma, specializing in creativity and innovation. Based in Philadelphia, she works as an Innovation Manager at a human capital consulting firm, leading federal innovation efforts and building out the firm's internal innovation practice. Outside of work, she's an avid sci-fi/fantasy reader, a frequent traveler, and dog mom to her pug, Petunia.',
    longBio:
      'Sam holds a PhD in Industrial-Organizational Psychology from the University of Oklahoma, where she specialized in the study of creativity and innovation. Originally from New Jersey and now based in Philadelphia, Pennsylvania, she brings that academic grounding to her current role as an Innovation Manager at a human capital consulting firm. In this role, she leads federal innovation efforts, helping government clients think differently about how they solve problems and deliver value. She also plays a central role in building the firm’s internal innovation capability, working to develop it into a robust practice area. At the heart of this work is a broader mission that Sam is deeply passionate about: making the principles of creativity and innovation more accessible, not just to organizations, but to individuals seeking to bring more inventive thinking into their own work and lives. Outside of the office, Sam is an avid reader of science fiction and fantasy, always traveling to somewhere new, and a devoted dog mom to her pug, Petunia.',
    photo: '/authors/sam.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/samantha-england-phd-9a614b149/',
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
