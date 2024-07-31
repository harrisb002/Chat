import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express";

import prisma from "../prisma.js";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number.parseInt(req.params.id);
  const user = await prisma.user.findFirst({
    where: { id: id },
    include: {
      posts: true,
    },
  });

  if (!user) {
    // res.status(404).json({ error: "User not found" });
    return next(new Error("404")); // Using '404' to match in middleware errors.ts
  }

  res.send(user.username);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
    },
  });
  res.status(201).json({ user });
};

// Typing to RequestHandler to automatically know what the request types are implicitly
export const updateUser: RequestHandler = (req, res) => {
  res.json({ message: "updateUser hit" });
};

export const deleteUser: RequestHandler = (req, res) => {
  res.json({ message: "deleteUser hit" });
};

export const getUserPosts: RequestHandler = (req, res) => {
  res.json({ message: "getUserPosts hit" });
};

export const getUserLikedPosts: RequestHandler = (req, res) => {
  res.json({ message: "getUserLikedPosts hit" });
};

export const getUserFollowedPosts: RequestHandler = (req, res) => {
  res.json({ message: "getUserFollowedPosts hit" });
};
