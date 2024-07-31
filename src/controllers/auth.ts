import { RequestHandler } from "express";
import env from "dotenv";
import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

env.config();

export const login: RequestHandler = async (req, res) => {
  const { username } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "invalid username" });
  }

  const passwordValid = await bcrypt.compare(req.body.password, user.password);

  if (!passwordValid) {
    return res.status(401).json({ message: "invalid password" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};
