import { User } from '@src/models/User';
import { validateOrReject } from 'class-validator';
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
      const user = await this.repository.findOneOrFail({ where: { email: req.body.email } });
      const valid = await user.compare(req.body.password);
      if (!valid) {
        throw new Error('Email or password incorrect');
      }
      const token = jwt.sign(
        {
          user,
          exp: jwtConfig.exp_time,
        },
        jwtConfig.secret,
      );
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  logoff(req: Request, res: Response) {}
}
