import { Link } from '@src/models/Link';
import { User } from '@src/models/User';
import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

export class LinkController {
  protected repository: Repository<Link>;
  constructor() {
    this.repository = getRepository(Link);
  }
  async listAll(req: Request, res: Response) {
    const user = User.create(req.auth.user);
    const links = await this.repository.find({
      where: {
        user_id: user.id,
      },
    });
    res.status(200).json(links.map((l) => l.decryptLink(user)));
  }

  async create(req: Request, res: Response) {
    try {
      const user = User.create(req.auth.user);
      const { title, link } = req.body;
      const newLink = new Link();
      newLink.title = title;
      newLink.link = link;
      newLink.user_id = user.id;
      await this.validate(newLink);
      newLink.encryptLink(user);
      await this.repository.save(newLink);
      res.status(200).json(newLink.decryptLink(user));
    } catch (err) {
      if (Array.isArray(err)) {
        res.status(400).json({ message: 'failed to validate data', errors: err });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  }

  async validate(link: Link) {
    return validateOrReject(link);
  }
}
