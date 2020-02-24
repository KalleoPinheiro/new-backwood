import { verify } from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../configs/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json('Token not provided!');
  }

  try {
    const [, token] = authHeader.split(' ');
    const decoded = await promisify(verify)(token, authConfig.secret);
    req.user_id = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token!' });
  }
};
