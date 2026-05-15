import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const gerarToken = (user) => {
  return jwt.sign(
    {user}, 
    process.env.JWT_SECRET, 
    {expiresIn: process.env.JWT_EXPIRES_IN || '1h'});
};