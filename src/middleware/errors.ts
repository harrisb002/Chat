import { Request, Response, NextFunction } from "express";
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message === "404" || err.code === "P2025") {
    //P2025 is for deleting a resource that has already been deleted
    return res.status(404).json({ error: "Resource not found" });
  }

  console.log("Error message", err.message);
  console.log("Error code", err.code);
  console.log("Error stack", err.stack);

  //res.status(500).json({ error: 'Something went wrong' });
  next(err);
};

export default { errorHandler };
