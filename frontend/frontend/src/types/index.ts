export interface Message {
  id: number;
  content: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface Theme {
  name: string;
  gradient: string;
  ring: string;
  dotOk: string;
  dotWarn: string;
}

export interface AppState {
  hello: string;
  loadingHello: boolean;
  helloError: string;
  messages: Message[];
  messagesLoading: boolean;
  messagesError: string;
  newMessage: string;
  submitting: boolean;
  deletingMessageId: number | null;
  showConfirmDialog: boolean;
  messageToDelete: number | null;
}
