export interface SocialPost {
  platform: 'LinkedIn' | 'X (Twitter)' | 'Facebook' | 'Instagram';
  content: string;
  hashtags: string[];
  imageUrl?: string;
}