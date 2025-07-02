# Component Architecture

This directory contains all React components for the blog, organized by purpose.

## Directory Structure

```
components/
├── core/                   # Core/shared components
│   ├── post-factory.tsx   # Routes posts to appropriate components
│   └── post-base.tsx      # Default post renderer
├── post-types/            # Custom post type components
│   └── multiple-choice-post.tsx
└── index.ts              # Barrel exports
```

## Core Components

### PostFactory
The factory component that routes blog posts to their appropriate display components based on the `type` field.

### PostBase
A default renderer for posts that don't have a custom component. Displays the title and content in a simple article format.

## Post Type Components

### MultipleChoicePost
An interactive component that displays multiple choice questions with reveal animations. Used for posts with `type: "multiple-choice"`.

## Adding New Post Types

1. Create a new component in `post-types/`
2. Add it to the PostFactory switch statement
3. Export it from `index.ts`
4. Define the type in `src/types/blog.ts`
5. Add parsing logic to `src/lib/content-loader.ts`

## Component Guidelines

- All post type components should accept a `post` prop with the appropriate type
- Use consistent styling with the design system (white cards, black borders, box shadows)
- Maintain good contrast for accessibility (text-gray-900)
- Support responsive design
- Keep interactive elements smooth with transitions 