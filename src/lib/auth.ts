import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  // create token
  const payload = {
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    id: user.id,
    name: user.username,
  }
  const token = jwt.sign(payload, 'secret')
  return token
};

