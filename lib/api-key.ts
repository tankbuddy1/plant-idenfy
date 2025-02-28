import { encrypt, decrypt } from './crypto';

const API_KEY_STORAGE_KEY = 'gemini_api_key_secure';

export const storeApiKey = (apiKey: string): void => {
  try {
    const encryptedKey = encrypt(apiKey);
    // Use sessionStorage instead of localStorage
    sessionStorage.setItem(API_KEY_STORAGE_KEY, encryptedKey);
  } catch (error) {
    console.error('Failed to store API key securely');
    throw new Error('Failed to store API key');
  }
};

export const getApiKey = (): string | null => {
  try {
    // Get from sessionStorage instead of localStorage
    const encryptedKey = sessionStorage.getItem(API_KEY_STORAGE_KEY);
    if (!encryptedKey) return null;
    return decrypt(encryptedKey);
  } catch (error) {
    console.error('Failed to retrieve API key');
    return null;
  }
};

export const removeApiKey = (): void => {
  // Remove from sessionStorage instead of localStorage
  sessionStorage.removeItem(API_KEY_STORAGE_KEY);
};