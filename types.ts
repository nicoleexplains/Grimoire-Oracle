export enum View {
  Oracle,
  Invocations,
}

export interface Invocation {
  title: string;
  text: string;
}

export interface ChatMessagePart {
  text: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: ChatMessagePart[];
}

export interface Oracle {
  name: string;
  description: string;
  systemPrompt: string;
}
