/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'somethingsecret';
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  }
};
