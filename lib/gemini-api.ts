const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export class GeminiApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'GeminiApiError';
  }
}

export const identifyPlantWithGemini = async (
  apiKey: string,
  imageData: string,
): Promise<any> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`${API_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a plant identification expert. Analyze this plant image and provide detailed information about the plant. Return ONLY a valid JSON object with this exact structure (no additional text or explanation):
                {
                  "name": "Common name of the plant",
                  "scientificName": "Scientific name",
                  "confidence": 85,
                  "overview": "Brief description of the plant",
                  "features": [
                    "Key feature 1",
                    "Key feature 2",
                    "Key feature 3",
                    "Key feature 4"
                  ],
                  "care": {
                    "light": "Light requirements",
                    "water": "Watering needs",
                    "humidity": "Humidity requirements",
                    "temperature": "Temperature range"
                  },
                  "potSizes": [
                    "Small (4-6 inches)",
                    "Medium (8-10 inches)",
                    "Large (12+ inches)"
                  ],
                  "idealFor": [
                    "Living room",
                    "Office",
                    "Bedroom",
                    "Bathroom"
                  ]
                }`
              },
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: imageData
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = 'API request failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }
      throw new GeminiApiError(errorMessage, response.status);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new GeminiApiError('Invalid response format from API');
    }

    try {
      // Extract the JSON string from the response text
      const responseText = data.candidates[0].content.parts[0].text.trim();
      const jsonStartIndex = responseText.indexOf('{');
      const jsonEndIndex = responseText.lastIndexOf('}') + 1;
      const jsonString = responseText.slice(jsonStartIndex, jsonEndIndex);
      
      // Parse the JSON string
      const parsedData = JSON.parse(jsonString);

      // Validate the required fields
      if (!parsedData.name || !parsedData.scientificName || !parsedData.care) {
        throw new Error('Missing required fields in plant information');
      }

      // Ensure confidence is a number between 0 and 100
      parsedData.confidence = Math.min(Math.max(Number(parsedData.confidence) || 85, 0), 100);

      // Ensure arrays are properly formatted
      parsedData.features = Array.isArray(parsedData.features) ? parsedData.features : [];
      parsedData.potSizes = Array.isArray(parsedData.potSizes) ? parsedData.potSizes : [];
      parsedData.idealFor = Array.isArray(parsedData.idealFor) ? parsedData.idealFor : [];

      // Ensure care object has all required fields
      parsedData.care = {
        light: parsedData.care.light || 'Moderate light',
        water: parsedData.care.water || 'Regular watering',
        humidity: parsedData.care.humidity || 'Average humidity',
        temperature: parsedData.care.temperature || '65-80°F (18-27°C)'
      };

      return parsedData;
    } catch (error) {
      console.error('Failed to parse plant information:', error);
      throw new GeminiApiError('Failed to parse plant information. Please try again.');
    }
  } catch (error) {
    if (error instanceof GeminiApiError) {
      throw error;
    }
    if (error.name === 'AbortError') {
      throw new GeminiApiError('Request timed out after 30 seconds');
    }
    throw new GeminiApiError(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
};