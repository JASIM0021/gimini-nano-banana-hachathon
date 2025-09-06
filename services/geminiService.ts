
import { GoogleGenAI, Type } from "@google/genai";
import { SocialPost } from '../types';

// Use a singleton pattern to initialize the AI client only when needed.
// This prevents a crash on load if the API key is not set.
let ai: GoogleGenAI;

function getAiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = import.meta.env.API_KEY;
    if (!apiKey) {
      // This error will be caught by the App component's try-catch block
      // and displayed nicely in the UI.
      throw new Error("API_KEY is not configured. Please ensure it is set in your deployment environment.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

async function generateImageForPost(postContent: string): Promise<string> {
    const aiClient = getAiClient();
    // 1. Generate a concise visual prompt from the post content for better image results.
    const promptCreationResponse = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Based on the following social media post, create a short, descriptive, and visually compelling prompt for an AI image generator. The prompt should capture the essence of the post. Keep it under 50 words. Post: "${postContent}"`,
        config: {
            temperature: 0.3,
        }
    });
    const imagePrompt = promptCreationResponse.text.trim();

    if (!imagePrompt) {
        console.warn("Image prompt generation failed, using post content as fallback.");
    }

    // 2. Generate the image using the created prompt.
    const imageResponse = await aiClient.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: imagePrompt || `A visually appealing marketing image related to: ${postContent}`, // use fallback
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1',
        },
    });

    if (!imageResponse.generatedImages || imageResponse.generatedImages.length === 0) {
        throw new Error("Image generation failed to return an image.");
    }

    const base64ImageBytes: string = imageResponse.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
}

export async function generateSocialMediaPosts(
    topic: string, 
    url: string, 
    tone: string, 
    callToAction: string, 
    postLength: string
): Promise<SocialPost[]> {
  const aiClient = getAiClient();
    
  let customizationInstructions = `
**Customization Rules:**
- **Tone:** The tone of voice must be strictly '${tone}'.
- **Post Length:** Posts should be of '${postLength}' length. 'Short' is 1-2 sentences. 'Medium' is a concise paragraph. 'Long' is a more detailed paragraph.
`;

  if (callToAction) {
      customizationInstructions += `- **Call to Action:** Each post must seamlessly integrate the following call to action: "${callToAction}".\n`;
  }


  const prompt = `
    As an expert social media marketing manager specializing in lead generation, create a set of social media posts for different platforms.

    **Topic/Product:** ${topic}
    **Company URL:** ${url}
    
    ${customizationInstructions}

    **Your Goal:** Generate compelling posts that drive traffic, encourage engagement, and capture leads. The tone should be professional, persuasive, and tailored to each platform's audience. Each post must include the provided company URL.

    **Platforms to cover:**
    1.  **LinkedIn:** Professional, business-oriented. Focus on value, insights, and professional benefits.
    2.  **X (Twitter):** Concise, catchy, and engaging. Use strong calls-to-action and relevant hashtags.
    3.  **Facebook:** Conversational and community-focused. Encourage discussion and sharing.
    4.  **Instagram:** Visually-driven caption. Describe a compelling image or video and use a mix of popular and niche hashtags.

    Please generate one post for each platform.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              platform: {
                type: Type.STRING,
                description: "The social media platform (e.g., 'LinkedIn', 'X (Twitter)').",
                enum: ['LinkedIn', 'X (Twitter)', 'Facebook', 'Instagram']
              },
              content: {
                type: Type.STRING,
                description: "The full text content of the social media post, including the company URL."
              },
              hashtags: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                  description: "A relevant hashtag without the '#' symbol."
                },
                description: "An array of relevant hashtags for the post."
              }
            },
            required: ["platform", "content", "hashtags"],
            propertyOrdering: ["platform", "content", "hashtags"],
          }
        },
      },
    });

    const jsonText = response.text.trim();
    const posts: SocialPost[] = JSON.parse(jsonText);
    
    if (!Array.isArray(posts)) {
        throw new Error("AI response was not a valid array of posts.");
    }

    // Generate an image for each post in parallel
    const postsWithImages = await Promise.all(posts.map(async (post) => {
        try {
            const imageUrl = await generateImageForPost(post.content);
            return { ...post, imageUrl };
        } catch (imageError) {
            console.error(`Failed to generate image for ${post.platform} post:`, imageError);
            return post; // Return post without image on error
        }
    }));

    return postsWithImages;

  } catch (error) {
    console.error("Error generating social media posts:", error);
    if (error instanceof Error && error.message.includes("API_KEY")) {
        throw error;
    }
    throw new Error("Failed to generate content from the AI. The model may have returned an unexpected format.");
  }
}
