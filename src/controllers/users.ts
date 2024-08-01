import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma.js";

export const getUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

export const getUser: RequestHandler = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      posts: true,
    },
  });

  if (!user) {
    // res.status(404).json({ error: "User not found" });
    return next(new Error("404")); // Using '404' to match in middleware errors.ts
  }

  res.send({ user });
};

// Typing to RequestHandler to automatically know what the request types are implicitly
export const updateUser: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  delete req.body.roles;
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: req.body,
  });
  res.json({ user });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  del(req.user.id);
  res.sendStatus(200);
};

export const adminDeleteUser: RequestHandler = async (req, res, next) => {
  del(parseInt(req.params.id));
  res.sendStatus(200);
};

export const del = async (userId: number) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const getUserPosts: RequestHandler = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      posts: true,
    },
  });
  if (!user) {
    return next(new Error("404"));
  }
  res.send({ posts: user.posts });
};

export const getUserLikedPosts: RequestHandler = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      postsLiked: true,
    },
  });
  if (!user) {
    return next(new Error("404"));
  }
  res.send({ posts: user.postsLiked });
};

export const getUserFollowedPosts: RequestHandler = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      postsFollowed: true,
    },
  });
  if (!user) {
    return next(new Error("404"));
  }
  res.send({ posts: user.postsFollowed });
};
