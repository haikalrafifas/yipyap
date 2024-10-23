import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const sign = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verify = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return false;
    // throw new Error('Invalid token');
  }
};
