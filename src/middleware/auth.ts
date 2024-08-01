import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();
const JWT_SECRET = process.env.JWT_SECRET!;

const auth: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization!;

    // Get just the JSON web token
    const token = authHeader.split(" ")[1]!;

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (!req?.user?.roles?.includes("ADMIN")) {
    return res.status(403).json({ error: "You're not permitted to do this" });
  }

  return next();
};

export default auth;
