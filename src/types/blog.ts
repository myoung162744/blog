export type InteractivePostType = 'multiple-choice' | 'quiz' | 'poll' | 'interactive-story';

export interface BaseInteractivePost {
  type: InteractivePostType;
  title: string;
  content: string;
  metadata: Record<string, any>;
}

export interface MultipleChoicePost extends BaseInteractivePost {
  type: 'multiple-choice';
  question: string;
  options: string[];
  followUpContent: {
    question: string;
    subheading: string;
    description: string;
  };
  mainContent: string;
}

export interface QuizPost extends BaseInteractivePost {
  type: 'quiz';
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  results: Record<string, string>;
}

export interface PollPost extends BaseInteractivePost {
  type: 'poll';
  question: string;
  options: string[];
  results?: Record<string, number>;
}

export interface InteractiveStoryPost extends BaseInteractivePost {
  type: 'interactive-story';
  segments: Array<{
    content: string;
    choices: Array<{
      text: string;
      nextSegment: number;
    }>;
  }>;
}

export type BlogPost = MultipleChoicePost | QuizPost | PollPost | InteractiveStoryPost; 