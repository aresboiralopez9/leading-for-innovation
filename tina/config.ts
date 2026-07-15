import { defineConfig } from "tinacms";

const postCategories = [
  "Research to Practice",
  "Debate",
  "Hot Takes",
  "Expert Lens",
  "Myth Buster",
  "Innovation Spotlight",
];

const colorOptions = [
  "bg-lfi-blue",
  "bg-lfi-blue/10",
  "bg-lfi-green",
  "bg-lfi-yellow",
  "bg-lfi-yellow/10",
  "bg-lfi-green/10",
  "bg-lfi-mint",
  "bg-lfi-mint/10",
  "bg-ink",
];

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
          author: "",
          companionSlug: "",
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
            options: postCategories,
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
            name: "author",
            label: "Author ID",
            description: "Use the author file name, such as ares or sam.",
          },
          {
            type: "string",
            name: "companionSlug",
            label: "Companion Post Slug",
            description: "Optional. Use the slug of a companion post.",
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
        name: "author",
        label: "Authors",
        path: "content/authors",
        format: "md",
        defaultItem: () => ({
          role: "Co-founder",
          initials: "",
          color: "bg-lfi-blue",
          photo: "",
          linkedInUrl: "",
          bio: "",
        }),
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              const name = values?.name || "author";

              return name
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
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "role",
            label: "Role",
          },
          {
            type: "string",
            name: "initials",
            label: "Initials",
          },
          {
            type: "string",
            name: "color",
            label: "Color",
            options: colorOptions,
          },
          {
            type: "image",
            name: "photo",
            label: "Photo",
          },
          {
            type: "string",
            name: "linkedInUrl",
            label: "LinkedIn URL",
          },
          {
            type: "string",
            name: "bio",
            label: "Short Bio",
            description: "Used on homepage, about cards, and bylines.",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Full Bio",
            description: "Used on the individual founder page.",
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
          { type: "string", name: "heroBadgeText", label: "Hero Badge Text" },
          { type: "string", name: "heroHeadline", label: "Hero Headline" },
          { type: "string", name: "heroHeadlineAccent", label: "Hero Headline Accent" },
          { type: "string", name: "heroSubtext", label: "Hero Subtext", ui: { component: "textarea" } },
          { type: "string", name: "heroPrimaryButtonText", label: "Primary Button Text" },
          { type: "string", name: "heroPrimaryButtonHref", label: "Primary Button Link" },
          { type: "string", name: "heroSecondaryButtonText", label: "Secondary Button Text" },
          { type: "string", name: "heroSecondaryButtonHref", label: "Secondary Button Link" },
          { type: "string", name: "startHereLabel", label: "Start Here Label" },
          { type: "string", name: "startHereHeading", label: "Start Here Heading", ui: { component: "textarea" } },
          {
            type: "object",
            name: "startHereCards",
            label: "Start Here Cards",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "href", label: "Link" },
              { type: "string", name: "colorClass", label: "Text Color Class", description: "Example: text-lfi-blue or text-lfi-green." },
            ],
          },
          { type: "string", name: "featuredSectionLabel", label: "Featured Section Label" },
          { type: "string", name: "featuredSectionHeading", label: "Featured Section Heading" },
          { type: "string", name: "postTypesSectionLabel", label: "Post Types Section Label" },
          { type: "string", name: "postTypesSectionHeading", label: "Post Types Section Heading" },
          {
            type: "object",
            name: "postTypeCards",
            label: "Post Type Cards",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "href", label: "Link" },
              { type: "string", name: "className", label: "Card Style Class" },
            ],
          },
          { type: "string", name: "foundersSectionLabel", label: "Founders Section Label" },
          { type: "string", name: "foundersSectionHeading", label: "Founders Section Heading" },
          { type: "string", name: "foundersSectionText", label: "Founders Section Text", ui: { component: "textarea" } },
          { type: "string", name: "foundersButtonText", label: "Founders Button Text" },
          { type: "string", name: "foundersButtonHref", label: "Founders Button Link" },
          { type: "string", name: "latestSectionLabel", label: "Latest Posts Section Label" },
          { type: "string", name: "latestSectionHeading", label: "Latest Posts Section Heading" },
          { type: "string", name: "latestSectionText", label: "Latest Posts Section Text", ui: { component: "textarea" } },
          { type: "string", name: "followSectionLabel", label: "Follow Section Label" },
          { type: "string", name: "followSectionHeading", label: "Follow Section Heading" },
          { type: "string", name: "followSectionText", label: "Follow Section Text", ui: { component: "textarea" } },
          { type: "string", name: "followButtonText", label: "Follow Button Text" },
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
          { type: "string", name: "seoTitle", label: "SEO Title" },
          { type: "string", name: "seoDescription", label: "SEO Description", ui: { component: "textarea" } },
          { type: "string", name: "sectionLabel", label: "Section Label" },
          { type: "string", name: "headline", label: "Headline" },
          { type: "string", name: "headlineAccent", label: "Headline Accent" },
          { type: "string", name: "intro", label: "Intro Paragraph", ui: { component: "textarea" } },
          { type: "string", name: "pointOfViewLabel", label: "Point of View Label" },
          { type: "string", name: "pointOfViewText", label: "Point of View Text", ui: { component: "textarea" } },
          { type: "string", name: "primaryButtonText", label: "Primary Button Text" },
          { type: "string", name: "primaryButtonHref", label: "Primary Button Link" },
          { type: "string", name: "secondaryButtonText", label: "Secondary Button Text" },
          { type: "string", name: "peopleSectionLabel", label: "People Section Label" },
          { type: "string", name: "peopleSectionHeading", label: "People Section Heading" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
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
          { type: "string", name: "siteName", label: "Site Name" },
          { type: "string", name: "siteTagline", label: "Site Tagline" },
          { type: "string", name: "linkedInUrl", label: "Company LinkedIn URL" },
          { type: "boolean", name: "betaBadge", label: "Show Beta badge in header?" },
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
          { type: "string", name: "siteMetaTitle", label: "Default Meta Title" },
          { type: "string", name: "siteMetaDescription", label: "Default Meta Description", ui: { component: "textarea" } },
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
          { type: "string", name: "badgeText", label: "Badge Text" },
          { type: "string", name: "headline", label: "Headline" },
          { type: "string", name: "subtext", label: "Subtext", ui: { component: "textarea" } },
          { type: "string", name: "emailPlaceholder", label: "Email Input Placeholder" },
          { type: "string", name: "buttonText", label: "Submit Button Text" },
          { type: "string", name: "successMessage", label: "Success Message" },
          { type: "string", name: "linkedInNudge", label: "LinkedIn Nudge Text" },
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
          { type: "string", name: "brandTagline", label: "Brand Tagline", ui: { component: "textarea" } },
          { type: "string", name: "staySectionLabel", label: "Stay Section Label" },
          { type: "string", name: "staySectionText", label: "Stay Section Text", ui: { component: "textarea" } },
          { type: "string", name: "linkedInButtonText", label: "LinkedIn Button Text" },
          { type: "string", name: "copyrightSuffix", label: "Copyright Suffix" },
          { type: "string", name: "builtByLine", label: "Built By Line" },
        ],
      },
    ],
  },
});
