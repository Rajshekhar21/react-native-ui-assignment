// User Service
// This file contains API calls for user profile and onboarding operations

import { User, UserProfile, Address, ProfessionalInfo, PortfolioItem, VerificationDocument } from '../context/AuthContext';

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  email?: string;
  accountType?: 'individual' | 'business';
  profile?: Partial<UserProfile>;
}

export interface UpdateAddressRequest {
  address: Address;
}

export interface UpdateProfessionalInfoRequest {
  professionalInfo: ProfessionalInfo;
}

export interface AddPortfolioItemRequest {
  portfolioItem: PortfolioItem;
}

export interface UploadDocumentRequest {
  document: {
    type: string;
    file: File | Blob;
  };
}

class UserService {
  private baseURL = 'https://your-api-endpoint.com/api/users';

  // Get user profile
  async getUserProfile(token: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user profile: ${response.status}`);
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw new Error('Failed to fetch user profile. Please try again.');
    }
  }

  // Update user profile
  async updateUserProfile(token: string, userData: UpdateUserRequest): Promise<User> {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user profile: ${response.status}`);
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Update user profile error:', error);
      throw new Error('Failed to update user profile. Please try again.');
    }
  }

  // Update user address
  async updateAddress(token: string, addressData: UpdateAddressRequest): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/address`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update address: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update address error:', error);
      throw new Error('Failed to update address. Please try again.');
    }
  }

  // Update professional info
  async updateProfessionalInfo(token: string, professionalData: UpdateProfessionalInfoRequest): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/professional-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(professionalData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update professional info: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update professional info error:', error);
      throw new Error('Failed to update professional info. Please try again.');
    }
  }

  // Add portfolio item
  async addPortfolioItem(token: string, portfolioData: AddPortfolioItemRequest): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add portfolio item: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Add portfolio item error:', error);
      throw new Error('Failed to add portfolio item. Please try again.');
    }
  }

  // Upload document
  async uploadDocument(token: string, documentData: UploadDocumentRequest): Promise<{ document: VerificationDocument }> {
    try {
      const formData = new FormData();
      formData.append('type', documentData.document.type);
      formData.append('file', documentData.document.file);

      const response = await fetch(`${this.baseURL}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload document: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Upload document error:', error);
      throw new Error('Failed to upload document. Please try again.');
    }
  }

  // Complete onboarding
  async completeOnboarding(token: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/complete-onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to complete onboarding: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Complete onboarding error:', error);
      throw new Error('Failed to complete onboarding. Please try again.');
    }
  }

  // Get user portfolio
  async getUserPortfolio(token: string): Promise<PortfolioItem[]> {
    try {
      const response = await fetch(`${this.baseURL}/portfolio`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch portfolio: ${response.status}`);
      }

      const data = await response.json();
      return data.portfolio;
    } catch (error) {
      console.error('Get portfolio error:', error);
      throw new Error('Failed to fetch portfolio. Please try again.');
    }
  }

  // Delete portfolio item
  async deletePortfolioItem(token: string, itemId: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/portfolio/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete portfolio item: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Delete portfolio item error:', error);
      throw new Error('Failed to delete portfolio item. Please try again.');
    }
  }

  // Get verification documents
  async getVerificationDocuments(token: string): Promise<VerificationDocument[]> {
    try {
      const response = await fetch(`${this.baseURL}/documents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.status}`);
      }

      const data = await response.json();
      return data.documents;
    } catch (error) {
      console.error('Get documents error:', error);
      throw new Error('Failed to fetch documents. Please try again.');
    }
  }

  // Delete verification document
  async deleteVerificationDocument(token: string, documentId: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/documents/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete document: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Delete document error:', error);
      throw new Error('Failed to delete document. Please try again.');
    }
  }
}

export default new UserService();
