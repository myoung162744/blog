# Blog Content System

This blog uses a content/presentation separation architecture where:

- **Content lives in markdown files** (`src/content/posts/*.md`)
- **Custom interactive components** display the content (`src/components/`)
- **The factory system** routes post types to their components (`src/components/interactive-post-factory.tsx`)

## Creating a New Blog Post

### 1. Create the Markdown File

Create a new `.md` file in `src/content/posts/` with frontmatter:

```markdown
---
title: "Your Post Title"
description: "A brief description for the homepage"
date: "2024-03-20"
author: "Your Name"
readTime: "3 min read"
type: "multiple-choice"  # or your custom type
featured: false
tags: ["tag1", "tag2"]
---

# Content goes here...
```

### 2. Post Types Available

#### Multiple Choice Posts (`type: "multiple-choice"`)

Structure your content like this:

```markdown
---
title: "Your Title"
type: "multiple-choice"
---

# Interactive Setup

## Question
Your question here?

## Options
1. Option one
2. Option two
3. Option three
4. Option four

## Follow-up
- **Question**: "Follow-up question?"
- **Subheading**: "A compelling subheading"
- **Description**: "Descriptive text about the dilemma"

---

# Main Content

Your main blog content in markdown format.

**Bold text** becomes emphasized.

> Blockquotes become highlighted callouts.

Regular paragraphs become styled content.
```

## Adding New Post Types

### 1. Define the Type

Add your type to `src/types/blog.ts`:

```typescript
export interface QuotePost extends BaseInteractivePost {
  type: 'quote';
  quote: string;
  author: string;
  context: string;
}

export type BlogPost = MultipleChoicePost | QuotePost | /* other types */;
```

### 2. Create the Component

Create `src/components/quote-post.tsx`:

```typescript
'use client'

import React from 'react';
import type { QuotePost } from '@/types/blog';

interface QuotePostProps {
  post: QuotePost;
  onComplete?: () => void;
}

export default function QuotePost({ post }: QuotePostProps) {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <article className="bg-white border-2 border-black rounded-lg p-8 md:p-12" style={{
          boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
        }}>
          <blockquote className="text-2xl italic text-center mb-6 text-gray-900">
            "{post.quote}"
          </blockquote>
          <p className="text-center text-gray-600 mb-8">— {post.author}</p>
          
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.mainContent }} />
        </article>
      </div>
    </div>
  );
}
```

### 3. Update the Factory

Add your component to `src/components/interactive-post-factory.tsx`:

```typescript
import QuotePost from './quote-post';

export default function InteractivePostFactory({ post, onComplete }: InteractivePostFactoryProps) {
  switch (post.type) {
    case 'multiple-choice':
      return <MultipleChoicePost post={post} onComplete={onComplete} />;
    case 'quote':
      return <QuotePost post={post} onComplete={onComplete} />;
    default:
      return <InteractivePostBase post={post} onComplete={onComplete} />;
  }
}
```

### 4. Update the Content Loader

Add parsing logic to `src/lib/content-loader.ts`:

```typescript
export function getPostBySlug(slug: string): BlogPost | null {
  // ... existing code ...
  
  switch (metadata.type) {
    case 'multiple-choice':
      return parseMultipleChoicePost(metadata, content);
    case 'quote':
      return parseQuotePost(metadata, content);
    default:
      throw new Error(`Unsupported post type: ${metadata.type}`);
  }
}

function parseQuotePost(metadata: PostMetadata, content: string): QuotePost {
  // Parse your custom content structure
  // Return formatted post object
}
```

## Benefits of This System

✅ **Clean Separation**: Content is separate from presentation code  
✅ **Flexible**: Each post type can have unique interactive behaviors  
✅ **Maintainable**: Easy to add new post types without changing existing ones  
✅ **Type Safe**: Full TypeScript support with proper type checking  
✅ **Scalable**: Factory pattern makes it easy to manage many post types 