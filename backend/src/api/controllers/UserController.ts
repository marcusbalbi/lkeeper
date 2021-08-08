import { UserRepository } from '@src/database/repositories/UserRepository';
import { UserService } from '@src/services/UserService';
import { Request, Response } from 'express';
import RestControllerContract from '../contracts/RestControllerContract';

export class UserController implements RestControllerContract {
  protected service: UserService;
  constructor() {
    this.service = new UserService(new UserRepository());
  }
  async listAll(req: Request, res: Response) {
    console.log(this.service);
    const users = await this.service.listAll(req.body);
    res.status(200).json(users);
  }
  async getById(req: Request, res: Response) {
    try {
      const users = await this.service.findUser(req.params.id);
      res.status(200).json(users);
    } catch (err) {
      console.log(err.name);
      if (err.name === 'RegisterNotFoundError') {
        res.status(404).json({ message: 'User not found: ' + err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }
  async create(req: Request, res: Response) {
    try {
      const users = await this.service.createUser(req.body);
      res.status(200).json(users);
    } catch (err) {
      console.log(err.name);
      if (err.name === 'InvalidRegisterError') {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }
  update(req: Request, res: Response) {}
  remove(req: Request, res: Response) {}
}
