import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    "main",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "md",
        defaultItem: () => ({
          date: new Date().toISOString(),
          featured: false,
          tags: [],
          category: "Research to Practice",
          linkedInUrl: "",
        }),
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              const title = values?.title || "untitled-post";

              return title
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim();
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            description: "A one-sentence summary shown on post cards and in SEO.",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            description: "Choose the type of post.",
            required: true,
            options: [
              "Research to Practice",
              "Debate",
              "Hot Takes",
              "Expert Lens",
              "Myth Buster",
              "Innovation Spotlight",
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Topics",
            description: "Add topic labels freely. Examples: Foundations, Process, Conditions, AI.",
            list: true,
          },
          {
            type: "string",
            name: "linkedInUrl",
            label: "LinkedIn Post URL",
            description: "Paste the URL for the LinkedIn version of this post.",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },

      {
        name: "homePage",
        label: "Home Page",
        path: "content/pages",
        match: { include: "home" },
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "heroBadgeText",
            label: "Hero Badge Text",
          },
          {
            type: "string",
            name: "heroHeadline",
            label: "Hero Headline",
          },
          {
            type: "string",
            name: "heroHeadlineAccent",
            label: "Hero Headline Accent",
          },
          {
            type: "string",
            name: "heroSubtext",
            label: "Hero Subtext",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "heroPrimaryButtonText",
            label: "Primary Button Text",
          },
          {
            type: "string",
            name: "heroPrimaryButtonHref",
            label: "Primary Button Link",
          },
          {
            type: "string",
            name: "heroSecondaryButtonText",
            label: "Secondary Button Text",
          },
          {
            type: "object",
            name: "positioningItems",
            label: "Positioning Strip Items",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "icon", label: "Emoji Icon" },
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "desc", label: "Description" },
            ],
          },
          {
            type: "string",
            name: "featuredSectionLabel",
            label: "Featured Section Label",
          },
          {
            type: "string",
            name: "featuredSectionHeading",
            label: "Featured Section Heading",
          },
          {
            type: "string",
            name: "postTypesSectionLabel",
            label: "Post Types Section Label",
          },
          {
            type: "string",
            name: "postTypesSectionHeading",
            label: "Post Types Section Heading",
          },
          {
            type: "string",
            name: "latestSectionLabel",
            label: "Latest Posts Section Label",
          },
          {
            type: "string",
            name: "latestSectionHeading",
            label: "Latest Posts Section Heading",
          },
        ],
      },

      {
        name: "aboutPage",
        label: "About Page",
        path: "content/pages",
        match: { include: "about" },
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Title",
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "sectionLabel",
            label: "Section Label",
          },
          {
            type: "string",
            name: "headline",
            label: "Headline",
          },
          {
            type: "string",
            name: "headlineAccent",
            label: "Headline Accent",
          },
          {
            type: "string",
            name: "intro",
            label: "Intro Paragraph",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "primaryButtonText",
            label: "Primary Button Text",
          },
          {
            type: "string",
            name: "primaryButtonHref",
            label: "Primary Button Link",
          },
          {
            type: "string",
            name: "secondaryButtonText",
            label: "Secondary Button Text",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      {
        name: "siteSettings",
        label: "Site Settings",
        path: "content/globals",
        match: { include: "settings" },
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Site Name",
            description: "Displayed in header and footer.",
          },
          {
            type: "string",
            name: "siteTagline",
            label: "Site Tagline",
            description: "Shown in the hero badge.",
          },
          {
            type: "string",
            name: "linkedInUrl",
            label: "LinkedIn URL",
            description: "Used in header, footer, and newsletter CTA.",
          },
          {
            type: "boolean",
            name: "betaBadge",
            label: "Show Beta badge in header?",
          },
          {
            type: "object",
            name: "navItems",
            label: "Navigation Items",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "URL or Path" },
            ],
          },
          {
            type: "string",
            name: "siteMetaTitle",
            label: "Default Meta Title",
          },
          {
            type: "string",
            name: "siteMetaDescription",
            label: "Default Meta Description",
            ui: { component: "textarea" },
          },
        ],
      },

      {
        name: "newsletterCTA",
        label: "Newsletter CTA",
        path: "content/globals",
        match: { include: "newsletter" },
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "badgeText",
            label: "Badge Text",
          },
          {
            type: "string",
            name: "headline",
            label: "Headline",
          },
          {
            type: "string",
            name: "subtext",
            label: "Subtext",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "emailPlaceholder",
            label: "Email Input Placeholder",
          },
          {
            type: "string",
            name: "buttonText",
            label: "Submit Button Text",
          },
          {
            type: "string",
            name: "successMessage",
            label: "Success Message",
          },
          {
            type: "string",
            name: "linkedInNudge",
            label: "LinkedIn Nudge Text",
          },
        ],
      },

      {
        name: "footer",
        label: "Footer",
        path: "content/globals",
        match: { include: "footer" },
        format: "md",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "brandTagline",
            label: "Brand Tagline",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "staySectionLabel",
            label: "Stay Section Label",
          },
          {
            type: "string",
            name: "staySectionText",
            label: "Stay Section Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "linkedInButtonText",
            label: "LinkedIn Button Text",
          },
          {
            type: "string",
            name: "copyrightSuffix",
            label: "Copyright Line Suffix",
          },
          {
            type: "string",
            name: "builtByLine",
            label: "Built By Line",
          },
        ],
      },
    ],
  },
});
