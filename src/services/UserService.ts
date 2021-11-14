import { PrismaClient, User } from '.prisma/client';
import { UserAndToken } from '../@types/dtos/user';
import { googleAuth } from '../clients/google';
import { generateJwt } from '../helpers/generateJwt';

export class UserService implements UserService {
  private JWT_EXPIRATION_TIME = '60s';

  constructor(private client: PrismaClient) {}

  public async signInWithGoogle(idToken: string): Promise<UserAndToken> {
    // Verify frontend token
    const tokenData = await googleAuth.verifyIdToken({ idToken });

    // Gets profile from google API
    const payload = tokenData.getPayload();
    if (!payload) throw new Error(`Couldn't get user data`);
    const { name, email, picture } = payload;

    // Creates or update User on DB
    const user = await this.upsert(name!, email!, picture!);

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

    return await this.client.user.upsert({
      where: { email },
      update: user,
      create: user,
    });
  }
}
