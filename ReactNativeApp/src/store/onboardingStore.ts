import AsyncStorage from '../utils/AsyncStorageFallback';

export interface OnboardingData {
  accountType: 'user' | 'vendor';
  userDetails: {
    name: string;
    phone: string;
    email: string;
    gender?: string;
    dob?: string;
  };
  businessDetails?: {
    companyName: string;
    businessEmail: string;
    businessAddress: string;
    license: string;
  };
  professionalProfile?: {
    yearsOfExperience: string;
    categories: string[];
    projectTypes: string[];
    styles: string[];
    languages: string[];
    businessHighlights: string[];
  };
  portfolio?: Array<{
    projectName: string;
    projectType: string;
    projectLocation: string;
    projectDescription: string;
    images: string[];
  }>;
  address?: {
    street: string;
    building: string;
    city: string;
    state: string;
    pincode: string;
    geo?: { lat: number; lng: number };
  };
  verification?: {
    documentType: string;
    documentImage: string;
  };
  uploadedFiles: {
    profileImage?: string;
    coverImage?: string;
    portfolioImages: string[];
    documentImage?: string;
  };
}

const ONBOARDING_DATA_KEY = 'onboarding_data';

class OnboardingStore {
  private data: OnboardingData | null = null;
  private listeners: Array<(data: OnboardingData | null) => void> = [];

  // Initialize store
  async initialize(): Promise<void> {
    try {
      const storedData = await AsyncStorage.getItem(ONBOARDING_DATA_KEY);
      if (storedData) {
        this.data = JSON.parse(storedData);
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Failed to initialize onboarding store:', error);
    }
  }

  // Subscribe to data changes
  subscribe(listener: (data: OnboardingData | null) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.data));
  }

  // Get current data
  getData(): OnboardingData | null {
    return this.data;
  }

  // Set account type
  async setAccountType(accountType: 'user' | 'vendor'): Promise<void> {
    this.data = {
      ...this.data,
      accountType,
      userDetails: this.data?.userDetails || {
        name: '',
        phone: '',
        email: '',
      },
      uploadedFiles: this.data?.uploadedFiles || {
        portfolioImages: [],
      },
    };
    await this.persistData();
  }

  // Set user details
  async setUserDetails(userDetails: Partial<OnboardingData['userDetails']>): Promise<void> {
    if (!this.data) {
      throw new Error('Onboarding data not initialized');
    }
    
    this.data.userDetails = {
      ...this.data.userDetails,
      ...userDetails,
    };
    await this.persistData();
  }

  // Set business details
  async setBusinessDetails(businessDetails: OnboardingData['businessDetails']): Promise<void> {
    if (!this.data) {
      throw new Error('Onboarding data not initialized');
    }
    
    this.data.businessDetails = businessDetails;
    await this.persistData();
  }

  // Set professional profile
  async setProfessionalProfile(professionalProfile: OnboardingData['professionalProfile']): Promise<void> {
    if (!this.data) {
      throw new Error('Onboarding data not initialized');
    }
    
    this.data.professionalProfile = professionalProfile;
    await this.persistData();
  }

  // Add portfolio project
  async addPortfolioProject(project: OnboardingData['portfolio'][0]): Promise<void> {
    if (!this.data) {
      throw new Error('Onboarding data not initialized');
    }
    
    if (!this.data.portfolio) {
      this.data.portfolio = [];
    }
    
    this.data.portfolio.push(project);
    await this.persistData();
  }

  // Remove portfolio project
  async removePortfolioProject(index: number): Promise<void> {
    if (!this.data?.portfolio) {
      return;
    }
    
    this.data.portfolio.splice(index, 1);
    await this.persistData();
  }

  // Set address
  async setAddress(address: OnboardingData['address']): Promise<void> {
    if (!this.data) {
      throw new Error('Onboarding data not initialized');
    }
    
    this.data.address = address;
    await this.persistData();
  }

  // Set verification
  async setVerification(verification: OnboardingData['verification']): Promise<void> {
    if (!this.data) {
      throw new Error('Onboarding data not initialized');
    }
    
    this.data.verification = verification;
    await this.persistData();
  }

  // Set uploaded files
  async setUploadedFiles(uploadedFiles: Partial<OnboardingData['uploadedFiles']>): Promise<void> {
    if (!this.data) {
      throw new Error('Onboarding data not initialized');
    }
    
    this.data.uploadedFiles = {
      ...this.data.uploadedFiles,
      ...uploadedFiles,
    };
    await this.persistData();
  }

  // Add portfolio image
  async addPortfolioImage(imageUrl: string): Promise<void> {
    if (!this.data) {
      throw new Error('Onboarding data not initialized');
    }
    
    if (!this.data.uploadedFiles.portfolioImages) {
      this.data.uploadedFiles.portfolioImages = [];
    }
    
    this.data.uploadedFiles.portfolioImages.push(imageUrl);
    await this.persistData();
  }

  // Remove portfolio image
  async removePortfolioImage(imageUrl: string): Promise<void> {
    if (!this.data?.uploadedFiles.portfolioImages) {
      return;
    }
    
    this.data.uploadedFiles.portfolioImages = this.data.uploadedFiles.portfolioImages.filter(
      url => url !== imageUrl
    );
    await this.persistData();
  }

  // Validate data completeness
  validateData(): { isValid: boolean; missingFields: string[] } {
    if (!this.data) {
      return { isValid: false, missingFields: ['accountType'] };
    }

    const missingFields: string[] = [];

    // Check required fields
    if (!this.data.userDetails.name) missingFields.push('name');
    if (!this.data.userDetails.phone) missingFields.push('phone');
    if (!this.data.userDetails.email) missingFields.push('email');

    // Check vendor-specific fields
    if (this.data.accountType === 'vendor') {
      if (!this.data.businessDetails?.companyName) missingFields.push('companyName');
      if (!this.data.businessDetails?.businessEmail) missingFields.push('businessEmail');
      if (!this.data.businessDetails?.license) missingFields.push('license');
      if (!this.data.professionalProfile?.yearsOfExperience) missingFields.push('yearsOfExperience');
      if (!this.data.professionalProfile?.categories?.length) missingFields.push('categories');
      if (!this.data.address?.city) missingFields.push('city');
      if (!this.data.verification?.documentImage) missingFields.push('documentImage');
    }

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  }

  // Prepare final payload for API
  prepareApiPayload(): FormData {
    if (!this.data) {
      throw new Error('No onboarding data available');
    }

    const formData = new FormData();

    // Basic user info
    formData.append('name', this.data.userDetails.name);
    formData.append('phone', this.data.userDetails.phone);
    formData.append('email', this.data.userDetails.email);

    // Vendor-specific data
    if (this.data.accountType === 'vendor') {
      if (this.data.businessDetails) {
        formData.append('title', this.data.businessDetails.companyName);
        formData.append('license', this.data.businessDetails.license);
      }

      if (this.data.professionalProfile) {
        formData.append('about', this.data.professionalProfile.businessHighlights.join(', '));
        formData.append('categories', JSON.stringify(this.data.professionalProfile.categories));
        formData.append('projectTypes', JSON.stringify(this.data.professionalProfile.projectTypes));
        formData.append('styles', JSON.stringify(this.data.professionalProfile.styles));
        formData.append('languages', JSON.stringify(this.data.professionalProfile.languages));
        formData.append('businessHighlights', JSON.stringify(this.data.professionalProfile.businessHighlights));
      }

      if (this.data.address) {
        formData.append('location[city]', this.data.address.city);
        formData.append('location[state]', this.data.address.state);
        formData.append('location[pincode]', this.data.address.pincode);
      }

      // Add uploaded files
      if (this.data.uploadedFiles.profileImage) {
        formData.append('profileImage', {
          uri: this.data.uploadedFiles.profileImage,
          type: 'image/jpeg',
          name: 'profile.jpg',
        } as any);
      }

      if (this.data.uploadedFiles.coverImage) {
        formData.append('coverImage', {
          uri: this.data.uploadedFiles.coverImage,
          type: 'image/jpeg',
          name: 'cover.jpg',
        } as any);
      }

      if (this.data.uploadedFiles.portfolioImages.length > 0) {
        this.data.uploadedFiles.portfolioImages.forEach((imageUrl, index) => {
          formData.append('portfolio', {
            uri: imageUrl,
            type: 'image/jpeg',
            name: `portfolio_${index}.jpg`,
          } as any);
        });
      }

      if (this.data.uploadedFiles.documentImage) {
        formData.append('documentImage', {
          uri: this.data.uploadedFiles.documentImage,
          type: 'image/jpeg',
          name: 'document.jpg',
        } as any);
      }
    }

    return formData;
  }

  // Clear all data
  async clearData(): Promise<void> {
    this.data = null;
    await AsyncStorage.removeItem(ONBOARDING_DATA_KEY);
    this.notifyListeners();
  }

  // Persist data to storage
  private async persistData(): Promise<void> {
    try {
      await AsyncStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(this.data));
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to persist onboarding data:', error);
      throw error;
    }
  }

  // Get progress percentage
  getProgress(): number {
    if (!this.data) return 0;

    const totalSteps = this.data.accountType === 'vendor' ? 7 : 3;
    let completedSteps = 0;

    // Account type
    if (this.data.accountType) completedSteps++;

    // User details
    if (this.data.userDetails.name && this.data.userDetails.phone && this.data.userDetails.email) {
      completedSteps++;
    }

    // Vendor-specific steps
    if (this.data.accountType === 'vendor') {
      if (this.data.businessDetails?.companyName) completedSteps++;
      if (this.data.professionalProfile?.categories?.length) completedSteps++;
      if (this.data.portfolio?.length) completedSteps++;
      if (this.data.address?.city) completedSteps++;
      if (this.data.verification?.documentImage) completedSteps++;
    }

    return Math.round((completedSteps / totalSteps) * 100);
  }
}

// Export singleton instance
export const onboardingStore = new OnboardingStore();
export default onboardingStore;
