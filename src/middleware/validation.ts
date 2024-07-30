import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  next();
};

const validateAccount = [
  body("email").isEmail().withMessage("Invalid email").escape(),
  body("username")
    .isLength({ min: 5, max: 50 })
    .withMessage("username must be 5-50 characters")
    .escape(),
  validate,
];

export default { validateAccount };
