import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export async function createNewUser(req, res) {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
}

export async function signin(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.send();
    return;
  }
  
  const token = createJWT(user);
  res.json({ token });
}