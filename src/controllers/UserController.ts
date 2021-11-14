import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private service: UserService) {}

  public async signInWithGoogle(req: Request, res: Response) {
    const { tokenId } = req.body;

    const { user, token } = await this.service.signInWithGoogle(tokenId);

    console.log(user);

    res.status(200).json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  }
}
