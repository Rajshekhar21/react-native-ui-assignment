// AsyncStorage Fallback for development
// This provides a fallback when the native AsyncStorage module is not available

interface AsyncStorageFallback {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

// In-memory storage fallback
const memoryStorage: { [key: string]: string } = {};

const AsyncStorageFallback: AsyncStorageFallback = {
  getItem: async (key: string): Promise<string | null> => {
    return memoryStorage[key] || null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    memoryStorage[key] = value;
  },
  removeItem: async (key: string): Promise<void> => {
    delete memoryStorage[key];
  },
};

// Try to import AsyncStorage, fallback to memory storage if not available
let AsyncStorage: AsyncStorageFallback;

try {
  // Dynamic import to handle cases where the module isn't available
  const AsyncStorageModule = require('@react-native-async-storage/async-storage');
  AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
} catch (error) {
  console.warn('AsyncStorage not available, using fallback:', error);
  AsyncStorage = AsyncStorageFallback;
}

export default AsyncStorage;
