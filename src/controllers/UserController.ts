import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { User } from '.prisma/client';

interface IUserController {
  signInWithGoogle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;

  signInWithFacebook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export class UserController implements IUserController {
  constructor(private service: UserService) {
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.signInWithFacebook = this.signInWithFacebook.bind(this);
  }

  public async signInWithGoogle(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { tokenId } = req.body;

      const { user, token } = await this.service.signInWithGoogle(tokenId);

      this.sendSignInResponse(res, user, token);
    } catch (error) {
      next(error);
    }
  }

  public async signInWithFacebook(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { accessToken } = req.body;

      const { user, token } = await this.service.signInWithFacebook(
        accessToken
      );

      this.sendSignInResponse(res, user, token);
    } catch (error) {
      next(error);
    }
  }

  private sendSignInResponse(res: Response, user: User, token: string) {
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
