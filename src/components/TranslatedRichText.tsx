'use client'

import { TinaMarkdown } from 'tinacms/dist/rich-text'

interface TranslatedRichTextProps {
  content: any
}

export function TranslatedRichText({
  content,
}: TranslatedRichTextProps) {
  if (!content) {
    return null
  }

  return (
    <TinaMarkdown
      content={content}
    />
  )
}
