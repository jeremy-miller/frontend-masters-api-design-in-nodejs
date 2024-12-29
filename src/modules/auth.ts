import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

export async function hashPassword(password) {
  return bcrypt.hash(password, parseInt(config.secrets.passwordSaltRounds));
}

export async function comparePasswords(password, hash) {
  return bcrypt.compare(password, hash);
}

export function createJWT(user) {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.secrets.jwtSecret
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
    const user = jwt.verify(token, config.secrets.jwtSecret);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    res.send();
    return;
  }
}
