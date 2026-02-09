import { blink } from '../lib/blink';

export async function analyzeImage(file: File, userId: string) {
  try {
    // 1. Upload to storage to get public URL
    const extension = file.name.split('.').pop() || 'jpg';
    const path = `analyses/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    
    const { publicUrl } = await blink.storage.upload(file, path);

    // 2. Generate description using Vision
    const { text } = await blink.ai.generateText({
      model: 'google/gemini-3-flash',
      messages: [
        {
          role: 'system',
          content: 'You are an expert image describer. Provide aesthetic, detailed, and poetic descriptions of images. Focus on composition, colors, mood, and subject matter. Keep it structured but evocative. Use Markdown for formatting.'
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Analyze this image in detail. Provide a poetic title followed by a structured description.' },
            { type: 'image', image: publicUrl }
          ]
        }
      ]
    });

    // 3. Save to database history
    await blink.db.history.create({
      userId,
      imageUrl: publicUrl,
      description: text,
      createdAt: new Date().toISOString()
    });

    return {
      imageUrl: publicUrl,
      description: text
    };
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}
