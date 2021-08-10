import { Link } from '@src/models/Link';
import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import RestControllerContract from '../contracts/RestControllerContract';

export class LinkController {
  protected repository: Repository<Link>;
  constructor() {
    this.repository = getRepository(Link);
  }
  async listAll(req: Request, res: Response) {
    const user = req.auth.user;
    const links = await this.repository.find({
      where: {
        user_id: user.id,
      },
    });
    res.status(200).json(links);
  }
}
