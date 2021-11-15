import { OAuthUserDTO, UserAndToken } from '../@types/dtos/user';
import { User } from '.prisma/client';

import { GoogleClient } from '../clients/GoogleClient';
import { FbClient } from '../clients/FbClient';
import { prisma } from '../database';

import { generateJwt } from '../helpers/generateJwt';

export class UserService implements UserService {
  private JWT_EXPIRATION_TIME = '60s';

  public async signInWithGoogle(accessToken: string): Promise<UserAndToken> {
    try {
      // Gets profile from google people API
      const googleClient = new GoogleClient();
      const data = await googleClient.getProfileData(accessToken);

      // Creates or update User on DB and generate JWT Token
      return await this.upsertAndGenerateJWT(data);
    } catch (err) {
      throw new Error(`Can't sign user in: ${err.message}`);
    }
  }

  public async signInWithFacebook(accessToken: string): Promise<UserAndToken> {
    try {
      // Gets profile from facebook graph API
      const fbClient = new FbClient();
      const data = await fbClient.getProfileData(accessToken);

      // Creates or update User on DB and generate JWT Token
      return await this.upsertAndGenerateJWT(data);
    } catch (err) {
      throw new Error(`Can't sign user in: ${err.message}`);
    }
  }

  private async upsertAndGenerateJWT({
    name,
    email,
    avatarUrl,
  }: OAuthUserDTO): Promise<UserAndToken> {
    // Creates or update User on DB
    const user = await this.upsert(name, email, avatarUrl);

    // Creates JWT token
    const token = generateJwt(user, this.JWT_EXPIRATION_TIME);

    return { user, token };
  }

  private async upsert(
    name: string,
    email: string,
    avatarUrl: string
  ): Promise<User> {
    const user = { name, email, avatarUrl };

    return await prisma.user.upsert({
      where: { email },
      update: user,
      create: user,
    });
  }
}
