import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import User, { UserInterface } from "../models/User.js";
import Job from "../models/Job.js";
import { CustomAPIError } from "../utils/error.js";

// really needed? can be done with login!
export const getCurrentUser: RequestHandler = async (req, res) => {
  const user = await User.findById(req.user.userId);

  console.log(user);

  if (!user)
    throw new CustomAPIError(
      `Invalid request user ID`, // throw custom error
      StatusCodes.UNAUTHORIZED
    );

  res.status(StatusCodes.OK).json({ ...user.toObject() });
};

export const getAppStats: RequestHandler = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser: RequestHandler<object, object, UserInterface> = async (
  req,
  res
) => {
  const { user, body } = req;

  const { password, role, ...newUserSafeData } = body; // skip password & role

  console.log(newUserSafeData);

  const updatedUser = await User.findByIdAndUpdate(
    user.userId,
    newUserSafeData,
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "user updated", job: updatedUser });
};
