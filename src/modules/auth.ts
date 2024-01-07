import jwt, { Secret } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { getToken, decode } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET

// returns true if password matches hash
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized/No header");
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.send("Not authorized/No Token");
    return;
  }

  try {
    
    const payload = decode(token);
    req.user = payload;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized/Invalid Token");
    return;
  }
};
