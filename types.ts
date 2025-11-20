export interface GeneratedImage {
  id: string;
  url: string; // Base64 data URL
  prompt: string;
  size: string;
  category: string;
  timestamp: number;
}

export type ImageSize = '512x512' | '1024x1024' | '1536x1536' | '1920x1080 (Banner)';

export type ImageCategory = 'General' | 'Nature' | 'Futuristic' | 'Fantasy' | 'Animals' | 'Technology';

// Map sizes to Aspect Ratios supported by Imagen
// 1920x1080 is 16:9
export const ASPECT_RATIO_MAP: Record<ImageSize, string> = {
  '512x512': '1:1',
  '1024x1024': '1:1',
  '1536x1536': '1:1',
  '1920x1080 (Banner)': '16:9',
};