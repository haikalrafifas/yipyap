import { verify } from "../utils/jwt";

export default function authMiddleware(req, res) {
  const token = verify(req.headers?.authorization?.split(' ')[1]);

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid auth token!',
    });
  }

  return token;
};
