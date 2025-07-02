'use client'

import React from 'react';
import { BlogPost } from '@/types/blog';
import MultipleChoicePost from '@/components/post-types/multiple-choice-post';
import PostBase from './post-base';

interface PostFactoryProps {
  post: BlogPost;
  onComplete?: () => void;
}

export default function PostFactory({ post, onComplete }: PostFactoryProps) {
  switch (post.type) {
    case 'multiple-choice':
      return <MultipleChoicePost post={post} onComplete={onComplete} />;
    // Add other post type components here as they are implemented
    default:
      return <PostBase post={post} onComplete={onComplete} />;
  }
} 