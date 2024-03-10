export type Article = {
  _id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type User = {
  _id: string;
  login: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
};
