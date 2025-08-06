import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, MultipleChoicePost, TextPost } from '@/types/blog';

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

export function getAllPostSlugs(): string[] {
  try {
    const files = fs.readdirSync(CONTENT_DIR);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''));
  } catch (error) {
    console.warn('Could not read content directory:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const metadata = frontmatter as FrontmatterMetadata;
    
    // Skip files without a type
    if (!metadata.type) return null;
    
    // Parse content based on post type
    switch (metadata.type) {
      case 'text':
        return parseTextPost(metadata, content);
      case 'multiple-choice':
        return parseMultipleChoicePost(metadata, content);
      // Add other post types here
      default:
        throw new Error(`Unsupported post type: ${metadata.type}`);
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

function parseMultipleChoicePost(metadata: FrontmatterMetadata, content: string): MultipleChoicePost {
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

function parseTextPost(metadata: FrontmatterMetadata, content: string): TextPost {
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

function convertMarkdownToHtml(markdown: string): string {
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
}

export type BlogPostWithSlug = BlogPost & { slug: string };

export function getAllPosts(): BlogPostWithSlug[] {
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
} 