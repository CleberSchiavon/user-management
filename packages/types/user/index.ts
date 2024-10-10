import { PageMetaDto } from "../pagination";

export type User = {
  id: number;
  username: string;
  email: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserLoginReturn extends Omit<User, "createdAt" | "updatedAt"> {
  access_token: string;
}

export type UserFetchResponse = {
  data: User[];
  meta: PageMetaDto;
};
