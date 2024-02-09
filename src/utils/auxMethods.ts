import { Response } from "express";

export const attachCookie = (res: Response, token: string) => {
  const oneDay = 1000 * 60 * 60 * 24; // ms

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
  // A cookie with the HttpOnly attribute is inaccessible to the JavaScript Document.cookie API; it's only sent to the server.

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
};
