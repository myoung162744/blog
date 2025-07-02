# Interactive Blog Platform

A Next.js blog with a unique content/presentation separation architecture that enables rich, interactive blog posts while keeping content in clean markdown files.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## 📁 Architecture

### Content/Presentation Separation

This blog separates content from presentation:

- **Content** lives in markdown files (`src/content/posts/*.md`)
- **Presentation** is handled by React components (`src/components/post-types/*`)
- **Factory Pattern** routes posts to appropriate components based on type

### Directory Structure

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── blog/
│   │   └── [slug]/        # Dynamic blog post routes
│   └── page.tsx           # Homepage
├── components/
│   ├── core/              # Core components
│   │   ├── post-factory.tsx
│   │   └── post-base.tsx
│   └── post-types/        # Custom post components
│       └── multiple-choice-post.tsx
├── content/
│   └── posts/             # Markdown blog posts
├── lib/
│   └── content-loader.ts  # Markdown parsing
└── types/
    └── blog.ts            # TypeScript types
```

## ✍️ Writing Blog Posts

Create a markdown file in `src/content/posts/` with frontmatter:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: "2024-03-20"
author: "Your Name"
readTime: "5 min read"
type: "multiple-choice"
featured: true
tags: ["education", "interactive"]
---

# Your content here...
```

## 🎨 Post Types

### Multiple Choice Posts

Interactive posts that start with a multiple choice question:

```markdown
---
type: "multiple-choice"
---

# Interactive Setup

## Question
What's your question?

## Options
1. First option
2. Second option
3. Third option
4. Fourth option

## Follow-up
- **Question**: "Follow-up question?"
- **Subheading**: "Thought-provoking subtitle"
- **Description**: "Context about the question"

---

# Main Content

Your blog post content...
```

## 🔧 Adding New Post Types

1. Define the type in `src/types/blog.ts`
2. Create a component in `src/components/post-types/`
3. Add to PostFactory in `src/components/core/post-factory.tsx`
4. Add parsing logic to `src/lib/content-loader.ts`
5. Document the content structure

## 🎯 Design Principles

- **Clean Separation**: Content authors work in markdown
- **Type Safety**: Full TypeScript support
- **Consistent Design**: White cards, black borders, proper contrast
- **Interactive**: Each post type can have unique behaviors
- **Accessible**: High contrast, semantic HTML, keyboard support

## 📝 License

MIT
