import Chat from "@/models/Chat";

export interface RootState {
  auth: {
    isAuthenticated: boolean;
  },
  chats: {
    chats: Chat[]; // Use the Chat type here
  }
  // ... other slices of state
}
