import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt"

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
  // const secret = process.env.NEXTAUTH_SECRET;
  const secret = process.env.NEXTAUTH_SECRET;

  const token = getToken({req, secret});
  // console.log(payload);
  // const token = req.headers.bearer;

  if (!token) {
    res.status(401);
    res.send("Not authorized/No Token");
    return;
  }

  try {
    // const secret = process.env.NEXTAUTH_SECRET;
    // const payload = getToken({req, secret});
    req.user = token;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized/Invalid Token: " + e);
    return;
  }
};
