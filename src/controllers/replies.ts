import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express";

import prisma from "../prisma.js";

export const getReply: RequestHandler = (req, res) => {
  res.json({ message: "getPosts hit" });
};

export const createReply: RequestHandler = (req, res) => {
  res.json({ message: "createPost hit" });
};

export const deleteReply: RequestHandler = (req, res) => {
  res.json({ message: "getPost hit" });
};
