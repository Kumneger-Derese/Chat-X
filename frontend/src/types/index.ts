export type DeleteAccRes = {
  message: string;
};

export type UnseenMessageCount = {
  unseenCount: number;
};

export interface Message {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  profilePic: string;
}

export interface ApiResponse {
  _id: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
  message: string;
  conversationId: string;
  seenBy?: string[];
  shouldShake?: boolean;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  username: string;
  email: string;
  token: string;
}
