export type User = {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export interface UserLoginReturn extends Omit<User, 'createdAt' | 'updatedAt'> {
    access_token: string;
}