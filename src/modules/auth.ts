import jwt, { Secret } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { getToken, decode } from "next-auth/jwt";

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

export const protect = async (req, res, next) => {
  // const token = req.headers.bearer;

  try {
    const token = getToken({ req });
    console.log("JSON Web Token", token);
    req.user = token;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized/Invalid Token: " + e);
    return;
  }

  // if (!token) {
  //   res.status(401);
  //   res.send("Not authorized/No header");
  //   return;
  // }

  
};
