import { User } from '.prisma/client';

export type UserAndToken = {
  user: User;
  token: string;
};

export type OAuthUserDTO = {
  name: string;
  email: string;
  avatarUrl: string;
};

export type FBUserDTO = {
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
  id: string;
};
