import { RequestHandler } from "express";
import User, { UserInterface } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../utils/error.js";
import { attachCookie } from "../utils/auxMethods.js";
// import { UserInterface } from "../models/User.js";

// controllers
export const register: RequestHandler<object, object, UserInterface> = async (
  req,
  res,
  next
) => {
  const { body } = req;

  const isFirst = (await User.countDocuments()) === 0; // 1st user is admin (test)

  const user = await User.create({ ...body, role: isFirst ? "admin" : "user" });

  // res.status(StatusCodes.CREATED).json({ user: partialUser });
  res.status(StatusCodes.CREATED).json({ id: user._id, msg: "user created" });
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  // check user / password
  const user = await User.findOne({ email }).select("+password"); // password is hidden by default;

  const isValidUser = user && (await user.comparePassword(password));

  if (!isValidUser)
    throw new CustomAPIError(
      "Invalid Credentials", // throw custom error
      StatusCodes.UNAUTHORIZED
    );

  const { password: pass, ...partialUser } = user.toObject(); // do not send password

  const token = user.createJWT(); // setup the token

  attachCookie(res, token); // http only cookie

  return res
    .status(StatusCodes.OK)
    .json({ user: partialUser, msg: "user logged in" });
};

// when token is passed via cookie, it's important to kill/expire that cookie when logging out
export const logout: RequestHandler = async (req, res) => {
  res.cookie("token", "LOGOUT", {
    httpOnly: true,
    expires: new Date(), // now
  });

  console.log("SERVER LOGOUT OK");
  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};
