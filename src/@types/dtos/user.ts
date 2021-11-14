import { User } from '.prisma/client';

export type UserAndToken = {
  user: User;
  token: string;
};
