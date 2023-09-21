import Chat from "@/models/Chat";

export interface RootState {
  auth: {
    isAuthenticated: boolean;
  },
  chats: {
    chats: Chat[]; // Use the Chat type here
    index: number;
  }
  // ... other slices of state
}
