import { RequestHandler } from "express";
import { CustomAPIError } from "../utils/error.js";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import Job from "../models/Job.js";
// import { Types } from "mongoose";

// type customJwtPayload = {
//   userId: Types.ObjectId;
// };
export const adminOnly: RequestHandler = async (req, res, next) => {
  const {
    user: { role },
  } = req;

  if (role !== "admin")
    throw new CustomAPIError(
      "admin only route", // throw custom error
      StatusCodes.FORBIDDEN
    );

  next();
};

export const authJobResource: RequestHandler = async (req, res, next) => {
  const {
    params: { id },
    user,
  } = req;

  const job = await Job.findById(id);
  if (!job)
    throw new CustomAPIError(
      `no job with id ${id}`, // throw custom error
      StatusCodes.NOT_FOUND
    );

  const isAdmin = user.role === "admin";
  const isOwner = user.userId.toString() === job.createdBy.toString();

  if (!(isAdmin || isOwner))
    throw new CustomAPIError(
      "Not auth. to access this resource", // throw custom error
      StatusCodes.UNAUTHORIZED
    );

  next();
};

export const authenticate: RequestHandler = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    throw new CustomAPIError(
      "Auth. Invalid (no token!)",
      StatusCodes.UNAUTHORIZED
    );

  try {
    // decode
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log("decoded JWT", payload);

    // add user to req
    req.user = {
      userId: (payload as JwtPayload).userId,
      role: (payload as JwtPayload).role,
    };

    next();
  } catch (e) {
    throw new CustomAPIError(
      "Auth. Invalid (bad token!)",
      StatusCodes.UNAUTHORIZED
    );
  }
};
