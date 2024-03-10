import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  body("login", "Please enter a name (minimum 3 characters)").isLength({ min: 3 }),
];

export const articleCreateValidation = [
  body("text", "Enter article text").isLength({ min: 3 }).isString(),
];
