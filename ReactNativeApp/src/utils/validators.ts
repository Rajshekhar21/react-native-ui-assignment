// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Indian format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Password validation
export const isValidPassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Name validation
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

// Pincode validation (Indian format)
export const isValidPincode = (pincode: string): boolean => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

// License number validation
export const isValidLicense = (license: string): boolean => {
  return license.trim().length >= 5;
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Age validation
export const isValidAge = (dob: string): boolean => {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 18;
  }
  
  return age >= 18;
};

// Required field validation
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
};

// Form validation helper
export const validateForm = (data: Record<string, any>, rules: Record<string, any>): {
  isValid: boolean;
  errors: Record<string, string[]>;
} => {
  const errors: Record<string, string[]> = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    const fieldErrors: string[] = [];
    
    // Required validation
    if (fieldRules.required && !isRequired(value)) {
      fieldErrors.push(`${fieldRules.label || field} is required`);
    }
    
    // Email validation
    if (fieldRules.email && value && !isValidEmail(value)) {
      fieldErrors.push(`${fieldRules.label || field} must be a valid email`);
    }
    
    // Phone validation
    if (fieldRules.phone && value && !isValidPhone(value)) {
      fieldErrors.push(`${fieldRules.label || field} must be a valid phone number`);
    }
    
    // Password validation
    if (fieldRules.password && value) {
      const passwordValidation = isValidPassword(value);
      if (!passwordValidation.isValid) {
        fieldErrors.push(...passwordValidation.errors);
      }
    }
    
    // Name validation
    if (fieldRules.name && value && !isValidName(value)) {
      fieldErrors.push(`${fieldRules.label || field} must contain only letters and spaces`);
    }
    
    // Pincode validation
    if (fieldRules.pincode && value && !isValidPincode(value)) {
      fieldErrors.push(`${fieldRules.label || field} must be a valid pincode`);
    }
    
    // License validation
    if (fieldRules.license && value && !isValidLicense(value)) {
      fieldErrors.push(`${fieldRules.label || field} must be a valid license number`);
    }
    
    // URL validation
    if (fieldRules.url && value && !isValidUrl(value)) {
      fieldErrors.push(`${fieldRules.label || field} must be a valid URL`);
    }
    
    // Age validation
    if (fieldRules.age && value && !isValidAge(value)) {
      fieldErrors.push(`${fieldRules.label || field} must be 18 years or older`);
    }
    
    // Min length validation
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      fieldErrors.push(`${fieldRules.label || field} must be at least ${fieldRules.minLength} characters`);
    }
    
    // Max length validation
    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      fieldErrors.push(`${fieldRules.label || field} must be no more than ${fieldRules.maxLength} characters`);
    }
    
    // Custom validation
    if (fieldRules.custom && value) {
      const customResult = fieldRules.custom(value);
      if (typeof customResult === 'string') {
        fieldErrors.push(customResult);
      } else if (typeof customResult === 'boolean' && !customResult) {
        fieldErrors.push(`${fieldRules.label || field} is invalid`);
      }
    }
    
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Sanitize input
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned}`;
  }
  if (cleaned.length === 13 && cleaned.startsWith('+91')) {
    return cleaned;
  }
  return phone;
};

// Format name (capitalize first letter of each word)
export const formatName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
