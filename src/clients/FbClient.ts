import axios from 'axios';

import { FBUserDTO, OAuthUserDTO } from '../@types/dtos/user';

export class FbClient {
  private FB_BASE_URL = 'https://graph.facebook.com';

  public async getProfileData(access_token: string): Promise<OAuthUserDTO> {
    try {
      const fields = ['name', 'email', 'picture'].join(',');

      const { data } = await axios.get<FBUserDTO>(
        `${this.FB_BASE_URL}/me?fields=${fields}&access_token=${access_token}`
      );

      const name = data.name;
      const email = data.email;
      const avatarUrl = data.picture.data.url;

      return { name, email, avatarUrl };
    } catch {
      throw new Error('Invalid token');
    }
  }
}
