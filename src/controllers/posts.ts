import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express";

import prisma from "../prisma.js";

export const getPosts: RequestHandler = (req, res) => {
  res.json({ message: "getPosts hit" });
};

export const createPost: RequestHandler = (req, res) => {
  res.json({ message: "createPost hit" });
};

export const getPost: RequestHandler = (req, res) => {
  res.json({ message: "getPost hit" });
};

export const updatePost: RequestHandler = (req, res) => {
  res.json({ message: "updatePost hit" });
};

export const deletePost: RequestHandler = (req, res) => {
  res.json({ message: "deletePost hit" });
};

export const createLike: RequestHandler = (req, res) => {
  res.json({ message: "createLike hit" });
};

export const deleteLike: RequestHandler = (req, res) => {
  res.json({ message: "deleteLike hit" });
};

export const createFollow: RequestHandler = (req, res) => {
  res.json({ message: "createFollow hit" });
};

export const deleteFollow: RequestHandler = (req, res) => {
  res.json({ message: "deleteFollow hit" });
};
