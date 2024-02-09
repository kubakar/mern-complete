import { Router, RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";

import { register, login, logout } from "../controllers/authController.js";
import {
  validateLoginForm,
  validateRegisterForm,
} from "../middleware/validation.js";

// security package - limit api calls in time
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  message: "IP rate limit exceeded, please try later.", // response is straight string (429 Too Many Requests)
});

const router = Router();

const homeRoute: RequestHandler = (req, res) => {
  res.send("Auth!");
};

router.get("/", homeRoute); // test

router.post("/register", apiLimiter, ...validateRegisterForm, register);
router.post("/login", apiLimiter, ...validateLoginForm, login);

router.post("/logout", logout); // logout (expire cookie)

export default router;
