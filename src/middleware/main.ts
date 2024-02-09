import { RequestHandler, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// no route
export const notFoundMiddleware: RequestHandler = (req, res) => {
  // return res.status(404).json("Page is not there! 404");
  return res.status(404).json({ msg: "Page is not there! 404" });
};

type ErrorType = {
  name?: string;
  message?: string;
  statusCode?: number;
};

// error
export const errorMiddleware: ErrorRequestHandler = (
  err: ErrorType,
  req,
  res,
  next
) => {
  console.log(err);

  const defaultError = {
    statusCode: err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR, // 'statusCode' is taken from CustomAPIError
    msg: err.message ?? "Server Error !",
  };

  // return proper error status code from error that occured
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};
