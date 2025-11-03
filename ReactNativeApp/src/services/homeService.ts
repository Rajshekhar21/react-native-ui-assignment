import { apiGet, handleApiError } from './apiClient';
import { AxiosError } from 'axios';

export interface FeaturedDesigner {
  id: string;
  name: string;
  profileImage: string;
  avatar?: string; // Legacy support
  experienceYears: number;
  experience?: string; // Legacy support for "10 years"
  location: string | { city?: string; area?: string; pincode?: string; [key: string]: any };
  shortDescription: string;
  description?: string; // Legacy support
  rating?: number;
  reviewCount?: number;
  profession?: string;
}

export interface InspirationProject {
  id: string;
  title: string;
  imageUrl: string;
  image?: string; // Legacy support
  category: string;
  likes?: number;
}

export interface RecentWork {
  id: string;
  title: string;
  imageUrl: string;
  image?: string; // Legacy support
  location: string;
  description?: string;
  category?: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// Get featured designers
export const getFeaturedDesigners = async (): Promise<FeaturedDesigner[]> => {
  try {
    // Assuming we have a vendors endpoint that can filter by featured
    const response = await apiGet('/vendors?featured=true&limit=10');
    
    if (__DEV__) {
      console.log('✅ getFeaturedDesigners response:', JSON.stringify(response, null, 2));
    }
    
    // Handle different response structures
    // Backend returns: { success: true, data: { vendors: [...] } }
    const data = response?.data?.vendors || response?.vendors || response?.data || response;
    
    if (!Array.isArray(data)) {
      console.warn('⚠️ getFeaturedDesigners: Expected array but got:', typeof data);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching featured designers:', error);
    return []; // Return empty array instead of throwing
  }
};

// Get inspiration/project ideas
export const getInspirationProjects = async (category?: string): Promise<InspirationProject[]> => {
  try {
    // Use the working /products endpoint that matches ProductListingScreen
    const endpoint = category 
      ? `/products?category=${encodeURIComponent(category)}&page=1&limit=10`
      : '/products?page=1&limit=10';
    const response = await apiGet(endpoint);
    
    if (__DEV__) {
      console.log('✅ getInspirationProjects response:', JSON.stringify(response, null, 2));
    }
    
    // Handle different response structures from products API
    const products = response?.data?.products || response?.products || response?.data || response;
    
    if (!Array.isArray(products)) {
      console.warn('⚠️ getInspirationProjects: Expected array but got:', typeof products);
      return [];
    }
    
    // Map product fields to InspirationProject interface
    return products.map((product: any) => ({
      id: product._id,
      title: product.name,
      imageUrl: product.thumbnailImage?.url || (product.gallery && product.gallery[0]?.url) || '',
      image: product.thumbnailImage?.url || (product.gallery && product.gallery[0]?.url) || '',
      category: product.category || category || 'General',
    }));
  } catch (error) {
    console.error('Error fetching inspiration projects:', error);
    return []; // Return empty array instead of throwing
  }
};

// Get recent work
export const getRecentWork = async (): Promise<RecentWork[]> => {
  try {
    const response = await apiGet('/projects/recent?limit=10');
    
    if (__DEV__) {
      console.log('✅ getRecentWork response:', JSON.stringify(response, null, 2));
    }
    
    // Handle different response structures
    const data = response?.projects || response?.data || response;
    
    if (!Array.isArray(data)) {
      console.warn('⚠️ getRecentWork: Expected array but got:', typeof data);
      // Return mock data if API fails or returns invalid data
      return [
        {
          id: '1',
          title: 'Modern Open Kitchen Design with Granite Island and Mosaic Backsplash',
          imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          location: 'Dehradun, Uttrakhand',
          description: 'A stunning modern kitchen with elegant granite surfaces and artistic backsplash.',
        },
        {
          id: '2',
          title: 'Contemporary Living Room with Sectional Sofa',
          imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          location: 'Mumbai, Maharashtra',
          description: 'Spacious living area featuring comfortable seating and modern decor.',
        },
        {
          id: '3',
          title: 'Minimalist Bedroom with Built-in Wardrobe',
          imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
          image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
          location: 'Delhi, NCR',
          description: 'Clean and functional bedroom design with integrated storage solutions.',
        },
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching recent work:', error);
    // Return mock data on error
    return [
      {
        id: '1',
        title: 'Modern Open Kitchen Design with Granite Island and Mosaic Backsplash',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        location: 'Dehradun, Uttrakhand',
        description: 'A stunning modern kitchen with elegant granite surfaces and artistic backsplash.',
      },
      {
        id: '2',
        title: 'Contemporary Living Room with Sectional Sofa',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        location: 'Mumbai, Maharashtra',
        description: 'Spacious living area featuring comfortable seating and modern decor.',
      },
      {
        id: '3',
        title: 'Minimalist Bedroom with Built-in Wardrobe',
        imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
        location: 'Delhi, NCR',
        description: 'Clean and functional bedroom design with integrated storage solutions.',
      },
    ];
  }
};

// Get services
export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await apiGet('/services');
    
    if (__DEV__) {
      console.log('✅ getServices response:', JSON.stringify(response, null, 2));
    }
    
    // Handle different response structures
    const data = response?.services || response?.data || response;
    
    if (!Array.isArray(data)) {
      console.warn('⚠️ getServices: Expected array but got:', typeof data);
      // Return default services if API fails or returns invalid data
      return [
        {
          id: '1',
          name: 'Residential',
          icon: 'home',
          description: 'Personalized home designs that bring comfort, style, and functionality together.',
        },
        {
          id: '2',
          name: 'Commercial',
          icon: 'building',
          description: 'Smart and efficient interiors designed to enhance productivity and brand presence.',
        },
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return []; // Return empty array on error
  }
};

export default {
  getFeaturedDesigners,
  getInspirationProjects,
  getRecentWork,
  getServices,
};
