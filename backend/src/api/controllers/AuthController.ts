import { IncorrectPassword, User } from '@src/models/User';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import jwtConfig from '@src/config/jwt';

export class AuthController {
  protected repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async login(req: Request, res: Response) {
    try {
      // maybe all of this try block could be moves to a service if jwt would be used in different kind of apps
      const user = await this.repository.findOneOrFail({
        where: { email: req.body.email },
        select: ['password', 'email', 'id'],
      });
      // TODO password validation could be moved to a "service" or the User model instead
      const valid = await user.compare(req.body.password);
      if (!valid) {
        throw new IncorrectPassword('Email or password incorrect');
      }
      delete user.password;
      const token = jwt.sign(
        {
          user,
          // exp: jwtConfig.exp_time,
        },
        jwtConfig.secret,
      );
      res.status(200).json({ token });
    } catch (err) {
      if (['EntityNotFoundError', 'IncorrectPassword'].includes(err.name)) {
        return res.status(403).json({
          message: 'User not found!',
        });
      }
      res.status(500).json({ message: err.message });
    }
  }
  logoff(req: Request, res: Response) {}
}
