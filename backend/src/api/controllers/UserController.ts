import { User } from '@src/models/User';
import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import RestControllerContract from '../contracts/RestControllerContract';

export class UserController implements RestControllerContract {
  protected repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async listAll(req: Request, res: Response) {
    const users = await this.repository.find(req.body);
    res.status(200).json(users);
  }
  async getById(req: Request, res: Response) {
    try {
      const users = await this.repository.findOneOrFail(req.params.id);
      res.status(200).json(users);
    } catch (err) {
      if (err.name === 'EntityNotFoundError') {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = new User();
      user.email = email;
      await user.setPassword(password);
      await this.validate(user);
      await this.repository.save(user);
      res.status(200).json(user);
    } catch (err) {
      if (Array.isArray(err)) {
        res.status(400).json({ message: 'failed to validate data', errors: err });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }
  async update(req: Request, res: Response) {
    try {
      const user = await this.repository.findOneOrFail(req.params.id);
      const { email, password } = req.body;
      user.email = email;
      await user.setPassword(password);
      await this.validate(user);
      await this.repository.save(user);
      res.status(204).json();
    } catch (err) {
      if (Array.isArray(err)) {
        res.status(400).json({ message: 'failed to validate data', errors: err });
      } else if (err.name === 'EntityNotFoundError') {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }
  async remove(req: Request, res: Response) {
    try {
      await this.repository.delete(req.params.id);
      // remove all links from user ?
      res.status(204).json();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async validate(user: User) {
    return validateOrReject(user);
  }
}
