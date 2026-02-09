import { blink } from '../lib/blink';

export async function analyzeImage(file: File, userId: string) {
  try {
    // 1. Upload to storage to get public URL (Client-side upload is fine and efficient)
    const extension = file.name.split('.').pop() || 'jpg';
    const path = `analyses/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    
    const { publicUrl } = await blink.storage.upload(file, path);

    // 2. Call the secure server-side API route with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for AI analysis

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: publicUrl,
          userId: userId
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI Analysis engine encountered an issue');
      }

      const data = await response.json();

      return {
        imageUrl: data.imageUrl,
        description: data.description
      };
    } catch (fetchError: any) {
      if (fetchError.name === 'AbortError') {
        throw new Error('Analysis timed out. The AI engine is taking too long.');
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}