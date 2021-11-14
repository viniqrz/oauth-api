import 'dotenv/config';

import { User } from '.prisma/client';
import { sign } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export function generateJwt(user: User, expiration: string) {
  return sign(
    {
      data: user,
    },
    JWT_SECRET as string,
    { expiresIn: expiration }
  );
}
