import { GoogleGenAI } from '@google/genai';
import { message, type UploadFile } from 'antd';
import { useState } from 'react';

const genAI = new GoogleGenAI({
  apiKey: import.meta.env?.GEMINI_API_KEY || import.meta.env?.VITE_GEMINI_API_KEY,
});

// Helper to convert browser File to Gemini inlineData format
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string, mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

type Props = {
  onSuccess?: (result: any) => void
}

export const useAi = (props: Props) => {
  const { onSuccess } = props
  const [loading, setLoading] = useState(false)

  const generateContent = async (prompt: string, images?: UploadFile[]) => {
    setLoading(true)
    try {
      const contents: any[] = [];
      
      if (images && images.length > 0) {
        for (const img of images) {
          if (img.originFileObj) {
            const part = await fileToGenerativePart(img.originFileObj as File);
            contents.push(part);
          }
        }
      }
      
      contents.push(prompt);

      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
      });

      if (!result.text) {
        message.error('No content generated from AI');
        return
      }

      // Strip markdown if AI accidentally adds it
      const cleanJson = result.text.replace(/```json|```/gi, '').trim();
      const data = JSON.parse(cleanJson);

      if (data.error) {
        message.error(data.error);
        return;
      }

      onSuccess?.(data)
    } catch (err) {
      console.error(err);
      message.error("Failed to parse AI response. Please try again.");
    } finally {
      setLoading(false)
    }
  }

  return {
    generateContent,
    loading
  }
};