import jwt, { Secret } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { getToken, decode } from "next-auth/jwt";

const SECRET = process.env.NEXTAUTH_SECRET;

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
    return res.status(401).json({ message: "Not authorized/No header" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Not authorized/No Token" });
  }

  try {
    const payload = getToken({req, secret: SECRET});
    console.log("PAYLOAD ", payload);
    req.user = payload;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Not authorized/Invalid Token" });
  }
};
