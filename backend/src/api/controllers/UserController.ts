import { User } from '@src/models/User';
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
      res.status(404).json({ message: 'User not found: ' + err.message });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = new User();
      user.email = email;
      user.password = await user.hash(password);
      console.log(user);
      await this.repository.save(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  update(req: Request, res: Response) {}
  remove(req: Request, res: Response) {}
}
