export interface ReviewFormData {
  date: string;
  rating: number;
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateReviewForm(data: ReviewFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.date || !data.date.trim()) {
    errors.date = 'Date is required';
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.rating = 'Please select a rating between 1 and 5';
  }

  if (!data.name || !data.name.trim()) {
    errors.name = 'Name is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Feedback message is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
