// Enhanced encryption/decryption for session storage
// Note: This provides basic obfuscation for client-side storage
const ENCRYPTION_KEY = 'plantpal-secure-key-2025';

export const encrypt = (text: string): string => {
  try {
    // Simple XOR encryption with a key
    const textToChars = (text: string) => text.split('').map(c => c.charCodeAt(0));
    const byteHex = (n: number) => ("0" + Number(n).toString(16)).substr(-2);
    const keyCharCodes = textToChars(ENCRYPTION_KEY);
    
    const textCharCodes = textToChars(text);
    const bytes = new Array(textCharCodes.length);
    
    for(let i = 0; i < textCharCodes.length; i++) {
      const keyChar = keyCharCodes[i % keyCharCodes.length];
      bytes[i] = byteHex(textCharCodes[i] ^ keyChar);
    }
    
    return bytes.join('');
  } catch (error) {
    throw new Error('Encryption failed');
  }
};

export const decrypt = (encoded: string): string => {
  try {
    // Simple XOR decryption with the same key
    const textToChars = (text: string) => text.split('').map(c => c.charCodeAt(0));
    const keyCharCodes = textToChars(ENCRYPTION_KEY);
    
    const bytes = encoded.match(/.{1,2}/g) || [];
    const bytesNumbers = bytes.map(byte => parseInt(byte, 16));
    
    const chars = new Array(bytesNumbers.length);
    for(let i = 0; i < bytesNumbers.length; i++) {
      const keyChar = keyCharCodes[i % keyCharCodes.length];
      chars[i] = String.fromCharCode(bytesNumbers[i] ^ keyChar);
    }
    
    return chars.join('');
  } catch (error) {
    throw new Error('Decryption failed');
  }
};