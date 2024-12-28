import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hashPassword(password) {
  return bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT_ROUNDS));
}

export async function comparePasswords(password, hash) {
  return bcrypt.compare(password, hash);
}

export function createJWT(user) {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
}

export function protectMiddleware(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    console.error("No Authorization header");
    res.status(401);
    res.send();
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.error("No Bearer token");
    res.status(401);
    res.send();
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    res.send();
    return;
  }
}
