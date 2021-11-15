import 'dotenv/config';

import { OAuthUserDTO } from '../@types/dtos/user';
import { OAuth2Client } from 'google-auth-library';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export class GoogleClient {
  private auth: OAuth2Client;

  constructor() {
    this.auth = new OAuth2Client({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    });
  }

  public async getProfileData(idToken: string): Promise<OAuthUserDTO> {
    try {
      // Verify frontend token
      const tokenData = await this.auth.verifyIdToken({ idToken });

      // Gets profile from google API
      const payload = tokenData.getPayload();

      const name = payload.name;
      const email = payload.email;
      const avatarUrl = payload.picture;

      return { name, email, avatarUrl };
    } catch {
      throw new Error('Invalid token');
    }
  }
}
