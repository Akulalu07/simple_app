import type { Message, ApiResponse } from '../types';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response
    );
  }

  return response.json();
}

export const api = {
  messages: {
    getAll: (): Promise<Message[]> => apiRequest<Message[]>('/messages'),
    create: (content: string): Promise<Message> => apiRequest<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),
    delete: (id: number): Promise<void> => apiRequest(`/messages/${id}`, {
      method: 'DELETE',
    }),
  },
  health: (): Promise<ApiResponse> => apiRequest<ApiResponse>('/hello'),
};

export function handleApiError(response: Response, context: string): Promise<string> {
  const statusMessages: Record<number, string> = {
    400: 'Bad Request - Please check your input',
    401: 'Unauthorized - Please log in',
    403: 'Forbidden - You don\'t have permission',
    404: 'Not Found - Resource not available',
    409: 'Conflict - Resource already exists',
    422: 'Validation Error - Please check your data',
    429: 'Too Many Requests - Please wait before trying again',
    500: 'Server Error - Please try again later',
    502: 'Bad Gateway - Service temporarily unavailable',
    503: 'Service Unavailable - Please try again later'
  };
  
  const message = statusMessages[response.status] || `HTTP ${response.status}`;
  return Promise.resolve(`${context}: ${message}`);
}
