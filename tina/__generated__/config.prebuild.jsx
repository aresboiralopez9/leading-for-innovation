// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "master",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "md",
        defaultItem: () => ({
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          featured: false,
          framework: false,
          tags: []
        }),
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.title?.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim() || ""
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            description: "A one-sentence summary shown on post cards and in SEO.",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              "Creativity",
              "Innovation",
              "Leadership",
              "Frameworks",
              "Organizational Design",
              "Research"
            ]
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            description: "Add relevant tags (press Enter after each one).",
            list: true
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post",
            description: "Show this post in the 'Essential Reading' section on the homepage."
          },
          {
            type: "boolean",
            name: "framework",
            label: "Named Framework",
            description: "Is this post introducing a named framework?"
          },
          {
            type: "string",
            name: "frameworkName",
            label: "Framework Name",
            description: "e.g. 'Signal/Noise Framework' \u2014 shown as a badge on the post."
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
