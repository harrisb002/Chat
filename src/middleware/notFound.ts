import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({ error: "Route not found, check the request url" });
};

export default notFound;
