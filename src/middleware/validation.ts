import { Request, Response, NextFunction, RequestHandler } from "express";
import z, { ZodType } from "zod";
import * as schemas from "./schemas.js";
import { ValidationError } from "./errors.js";

export const validateParamId: RequestHandler = (req, res, next) => {
  const result = z
    .number()
    .int()
    .nonnegative()
    .safeParse(parseInt(req.params.id));

  if (!result.success) {
    return next(new ValidationError(result.error.issues));
  }

  next();
};

// Using higher order function to return a function
// The first function is returning the () => {}
export const validateBody =
  (schema: ZodType<any>): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new ValidationError(result.error.issues)); // Handling errors using custom Error
    }

    next();
  };

export const createUser = validateBody(schemas.User);
export const updateUser = validateBody(schemas.UserUpdate);
export const createPost = validateBody(schemas.Post);
