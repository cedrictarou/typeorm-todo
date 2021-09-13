import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  // create token
  const payload = {
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    id: user.id,
    name: user.username,
  }
  const SECRET_KEY = process.env.TOKEN_SECRET
  const token = jwt.sign(payload, SECRET_KEY)
  return token
};

