import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import jwtConfig from '@src/config/jwt';
const AuthMiddleware = (req: Request, res: Response, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer ')) {
      return res.status(403).json({ message: 'Invalid Authentication Token' });
    }
    const token = req.headers.authorization.split('Bearer ')[1]; //take only the token

    const result: any = jwt.verify(token, jwtConfig.secret);
    req.auth = result;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: 'User not Authenticated or Invalid Token', extra_message: err.message });
  }
};

export default AuthMiddleware;
