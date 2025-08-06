import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, MultipleChoicePost, TextPost } from '@/types/blog';
import { cache } from 'react';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/posts');

export interface FrontmatterMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  type: string;
  featured?: boolean;
  tags?: string[];
}

// In-memory cache for posts to avoid repeated file system reads
let postsCache: Map<string, BlogPost | null> | null = null;
let slugsCache: string[] | null = null;

// Use React's cache function for request memoization
export const getAllPostSlugs = cache((): string[] => {
  // Return cached slugs if available
  if (slugsCache !== null) {
    return slugsCache;
  }

  try {
    const files = fs.readdirSync(CONTENT_DIR);
    slugsCache = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''));
    return slugsCache;
  } catch (error) {
    console.warn('Could not read content directory:', error);
    slugsCache = [];
    return [];
  }
});

export const getPostBySlug = cache((slug: string): BlogPost | null => {
  // Initialize cache if needed
  if (postsCache === null) {
    postsCache = new Map();
  }

  // Return cached post if available
  if (postsCache.has(slug)) {
    return postsCache.get(slug) || null;
  }

  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const metadata = frontmatter as FrontmatterMetadata;
    
    // Skip files without a type
    if (!metadata.type) {
      postsCache.set(slug, null);
      return null;
    }
    
    let post: BlogPost | null = null;
    
    // Parse content based on post type
    switch (metadata.type) {
      case 'text':
        post = parseTextPost(slug, metadata, content);
        break;
      case 'multiple-choice':
        post = parseMultipleChoicePost(slug, metadata, content);
        break;
      default:
        throw new Error(`Unsupported post type: ${metadata.type}`);
    }
    
    // Cache the parsed post
    postsCache.set(slug, post);
    return post;
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    postsCache.set(slug, null);
    return null;
  }
});

function parseMultipleChoicePost(slug: string, metadata: FrontmatterMetadata, content: string): MultipleChoicePost {
  const sections = content.split('---');
  
  if (sections.length < 2) {
    throw new Error('Multiple choice post must have interactive setup and main content sections');
  }
  
  const interactiveSection = sections[0].trim();
  const mainContentSection = sections[1].trim();
  
  // Parse interactive setup section
  const questionMatch = interactiveSection.match(/## Question\s*\n(.+)/);
  const optionsMatch = interactiveSection.match(/## Options\s*\n((?:[A-Z]+\..+\n?)+)/);
  const followUpMatch = interactiveSection.match(/## Follow-up\s*\n((?:- \*\*.+?\*\*:.+\n?)+)/);
  
  if (!questionMatch || !optionsMatch || !followUpMatch) {
    throw new Error('Multiple choice post missing required sections (Question, Options, Follow-up)');
  }
  
  const question = questionMatch[1].trim();
  const options = optionsMatch[1]
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.replace(/^[A-Z]+\.\s*/, '').trim());
  
  // Parse follow-up content
  const followUpLines = followUpMatch[1].split('\n').filter(line => line.trim());
  const followUpContent: {
    question?: string;
    subheading?: string;
    description?: string;
  } = {};
  
  followUpLines.forEach(line => {
    const questionMatch = line.match(/- \*\*Question\*\*:\s*"([^"]+)"/);
    const subheadingMatch = line.match(/- \*\*Subheading\*\*:\s*"([^"]+)"/);
    const descriptionMatch = line.match(/- \*\*Description\*\*:\s*"([^"]+)"/);
    
    if (questionMatch) followUpContent.question = questionMatch[1];
    if (subheadingMatch) followUpContent.subheading = subheadingMatch[1];
    if (descriptionMatch) followUpContent.description = descriptionMatch[1];
  });
  
  // Ensure all required properties are present
  if (!followUpContent.question || !followUpContent.subheading) {
    throw new Error('Multiple choice post missing required follow-up content properties (question or subheading)');
  }
  
  // Convert markdown to HTML for main content
  const mainContentHtml = convertMarkdownToHtml(mainContentSection);
  
  return {
    type: 'multiple-choice',
    title: metadata.title,
    content: metadata.description,
    metadata: {
      author: metadata.author,
      date: metadata.date,
      readTime: metadata.readTime,
      featured: metadata.featured,
      tags: metadata.tags,
    },
    question,
    options,
    followUpContent: {
      question: followUpContent.question!,
      subheading: followUpContent.subheading!,
      description: followUpContent.description,
    },
    mainContent: mainContentHtml,
  };
}

function parseTextPost(slug: string, metadata: FrontmatterMetadata, content: string): TextPost {
  // Convert markdown to HTML for the entire content
  const mainContentHtml = convertMarkdownToHtml(content);
  
  return {
    type: 'text',
    title: metadata.title,
    content: metadata.description,
    metadata: {
      author: metadata.author,
      date: metadata.date,
      readTime: metadata.readTime,
      featured: metadata.featured,
      tags: metadata.tags,
    },
    mainContent: mainContentHtml,
  };
}

// Optimized markdown to HTML converter with memoization
const convertMarkdownToHtml = cache((markdown: string): string => {
  // Simple markdown to HTML converter
  // For production, consider using a proper markdown parser like 'marked' or 'remark'
  
  const html = markdown
    // Headers
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-6 text-gray-900">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mb-4 text-gray-900">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mb-3 text-gray-900">$1</h3>')
    
    // Bold text
    .replace(/\*\*(.+?)\*\*/g, '<span class="font-semibold text-gray-900">$1</span>')
    
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="pl-6 border-l-4 border-gray-300 mb-6 text-gray-900">$1</blockquote>')
    
    // Paragraphs
    .replace(/^([^<>\n].+)$/gm, '<p class="mb-6 text-gray-900">$1</p>')
    
    // Clean up extra line breaks
    .replace(/\n\s*\n/g, '\n')
    .trim();
  
  return html;
});

export type BlogPostWithSlug = BlogPost & { slug: string };

// Cached version of getAllPosts
export const getAllPosts = cache((): BlogPostWithSlug[] => {
  const slugs = getAllPostSlugs();
  // First, filter out slugs that don't produce a valid post
  const validPosts = slugs
    .map(slug => {
      const post = getPostBySlug(slug);
      return post ? { post, slug } : null;
    })
    .filter((item): item is { post: BlogPost; slug: string } => item !== null);

  // Then, map to BlogPostWithSlug
  return validPosts
    .map(({ post, slug }) => ({ ...post, slug }))
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
});

// Clear cache function for development
export function clearPostsCache() {
  postsCache = null;
  slugsCache = null;
}