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
    include: { password: true },
  });

  if (!user) {
    return res.status(401).json({ message: "invalid username" });
  }

  if (!user.password?.hash) {
    return res
      .status(401)
      .json({ message: "Error with Account Username or Password" });
  }

  const passwordValid = await bcrypt.compare(
    req.body.password,
    user.password.hash
  );

  if (!passwordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, roles: user.roles },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
};

export const register: RequestHandler = async (req, res, next) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(req.body.password, saltRounds);

  // Using spread to include to pass into the body
  const user = await prisma.user.create({
    data: {
      ...req.body,
      password: {
        create: {
          hash: hashedPass,
        },
      },
    },
  });

  res.status(201).json({ user });
};
