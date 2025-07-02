'use client'

import React from 'react';
import { BlogPost } from '@/types/blog';

interface PostBaseProps {
  post: BlogPost;
  onComplete?: () => void;
}

export default function PostBase({ post }: PostBaseProps) {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <article className="bg-white border-2 border-black rounded-lg p-8 md:p-12" style={{
          boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
        }}>
          <h1 className="text-3xl font-bold mb-6 text-gray-900">{post.title}</h1>
          <div className="prose max-w-none">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
} 