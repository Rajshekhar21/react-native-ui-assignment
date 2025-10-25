// Authentication Service
// This file contains API calls for authentication-related operations

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    accountType?: 'individual' | 'business';
    isOnboardingComplete?: boolean;
  };
  token: string;
}

export interface OTPRequest {
  email: string;
  otp: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordUpdateRequest {
  token: string;
  newPassword: string;
}

class AuthService {
  private baseURL = 'https://your-api-endpoint.com/api/auth';

  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  // Register new user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    }
  }

  // Verify OTP
  async verifyOTP(otpData: OTPRequest): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpData),
      });

      if (!response.ok) {
        throw new Error(`OTP verification failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw new Error('OTP verification failed. Please try again.');
    }
  }

  // Send OTP
  async sendOTP(email: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send OTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Send OTP error:', error);
      throw new Error('Failed to send OTP. Please try again.');
    }
  }

  // Reset password
  async resetPassword(resetData: PasswordResetRequest): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
      });

      if (!response.ok) {
        throw new Error(`Password reset failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Password reset failed. Please try again.');
    }
  }

  // Update password
  async updatePassword(updateData: PasswordUpdateRequest): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${updateData.token}`,
        },
        body: JSON.stringify({ newPassword: updateData.newPassword }),
      });

      if (!response.ok) {
        throw new Error(`Password update failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Password update error:', error);
      throw new Error('Password update failed. Please try again.');
    }
  }

  // Google authentication
  async googleAuth(googleToken: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/google-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ googleToken }),
      });

      if (!response.ok) {
        throw new Error(`Google authentication failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Google auth error:', error);
      throw new Error('Google authentication failed. Please try again.');
    }
  }

  // Logout
  async logout(token: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed. Please try again.');
    }
  }

  // Refresh token
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new Error('Token refresh failed. Please login again.');
    }
  }
}

export default new AuthService();
