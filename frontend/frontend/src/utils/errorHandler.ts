import { ApiError } from './api';

export class ErrorHandler {
  static handle(error: unknown, context: string): string {
    if (error instanceof ApiError) {
      return this.handleApiError(error, context);
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return 'Network Error - Please check your connection';
    }
    
    return `Unexpected error in ${context}: ${error}`;
  }
  
  private static handleApiError(error: ApiError, context: string): string {
    const statusMessages: Record<number, string> = {
      400: 'Invalid request data',
      401: 'Authentication required',
      403: 'Access denied',
      404: 'Resource not found',
      409: 'Conflict - resource already exists',
      422: 'Validation failed',
      429: 'Too many requests - please wait',
      500: 'Server error - please try again',
      502: 'Service temporarily unavailable',
      503: 'Service unavailable',
    };
    
    const message = statusMessages[error.status] || `HTTP ${error.status}`;
    return `${context}: ${message}`;
  }
}
