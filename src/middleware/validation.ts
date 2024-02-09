import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../utils/error.js";
import { JobStatus, JobType } from "../utils/constants.js";
import {
  ValidationChain,
  body,
  param,
  validationResult,
  Meta,
} from "express-validator";
import { Types } from "mongoose";
import User from "../models/User.js";

const withValidationErrors = (validateValues: ValidationChain[]) => {
  const errorHandler: RequestHandler<object> = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errMessages = errors.array().map((error) => error.msg);
      throw new CustomAPIError(
        errMessages.join(","), // throw custom error
        StatusCodes.BAD_REQUEST
      );
    }

    next();
  };

  return [validateValues, errorHandler];
};

export const validateJobsForm = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("location").notEmpty().withMessage("job location is required"),
  body("status").isIn(Object.values(JobStatus)).withMessage("invalid status"),
  body("type").isIn(Object.values(JobType)).withMessage("invalid type"),
]);

export const validateIdParam = withValidationErrors([
  param("id")
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage("invalid MongoDB ID"),
  // only single '.custom' is allowed probably
]);

const checkEmailDB = async (email: string, metadata: Meta) => {
  const { req } = metadata;

  const user = await User.findOne({ email });
  // check if user is within request (is logged)
  const isThisExistingUser = req.user
    ? user?._id.toString() === req.user.userId.toString()
    : false;
  console.log("checkEmailDB validation | req.user =", req.user);
  console.log(
    user?._id.toString(),
    isThisExistingUser ? req.user.userId.toString() : "not existing user"
  );
  if (user && !isThisExistingUser) throw new Error("e-mail already exists");
};

const basicUserValidation = [
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("lastname is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(checkEmailDB),
  // "password" is not checked here
];

export const validateUpdateUserForm = withValidationErrors(basicUserValidation);

// email will be checked async (if already exists)
export const validateRegisterForm = withValidationErrors([
  ...basicUserValidation,
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 char. long"),
]);

export const validateLoginForm = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("password").notEmpty().withMessage("password is required"),
]);
