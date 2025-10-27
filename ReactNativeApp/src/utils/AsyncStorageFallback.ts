// AsyncStorage fallback for development
// This prevents the app from crashing when AsyncStorage is not properly linked

interface AsyncStorageFallback {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

let AsyncStorage: AsyncStorageFallback;

try {
  // Try to import the real AsyncStorage
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (error) {
  console.warn('AsyncStorage not available, using fallback storage');
  
  // Fallback to in-memory storage
  const memoryStorage: { [key: string]: string } = {};
  
  AsyncStorage = {
    getItem: async (key: string): Promise<string | null> => {
      return memoryStorage[key] || null;
    },
    setItem: async (key: string, value: string): Promise<void> => {
      memoryStorage[key] = value;
    },
    removeItem: async (key: string): Promise<void> => {
      delete memoryStorage[key];
    },
    clear: async (): Promise<void> => {
      Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
    },
  };
}

export default AsyncStorage;