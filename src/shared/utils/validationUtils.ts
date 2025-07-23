/**
 * Validation utility functions
 */

export interface IValidationResult {
  isValid: boolean;
  errors: string[];
}

export const ValidationUtils = {
  /**
   * Validate email format
   */
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate required field
   */
  validateRequired: (value: any, fieldName: string): string | null => {
    if (value === null || value === undefined || value === '') {
      return `${fieldName} is required`;
    }
    return null;
  },

  /**
   * Validate string length
   */
  validateLength: (value: string, min: number, max: number, fieldName: string): string | null => {
    if (value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    if (value.length > max) {
      return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
  },

  /**
   * Validate project data
   */
  validateProject: (project: any): IValidationResult => {
    const errors: string[] = [];

    // Title validation
    const titleError = ValidationUtils.validateRequired(project.title, 'Title');
    if (titleError) errors.push(titleError);
    else {
      const lengthError = ValidationUtils.validateLength(project.title, 1, 255, 'Title');
      if (lengthError) errors.push(lengthError);
    }

    // Description validation (optional but with length limit)
    if (project.description) {
      const descLengthError = ValidationUtils.validateLength(project.description, 0, 1000, 'Description');
      if (descLengthError) errors.push(descLengthError);
    }

    // Status validation
    const statusError = ValidationUtils.validateRequired(project.status, 'Status');
    if (statusError) errors.push(statusError);

    // Priority validation
    const priorityError = ValidationUtils.validateRequired(project.priority, 'Priority');
    if (priorityError) errors.push(priorityError);

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};
