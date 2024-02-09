import "express-async-errors";
import express, { Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// handle static files + client app
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// security packages
import helmet from "helmet";

import { errorMiddleware, notFoundMiddleware } from "./middleware/main.js";

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import connectDB from "./dbConnect.js";
import { authenticate } from "./middleware/auth.js";

const app = express();

// security packages
app.use(helmet());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

// handle static files + client app - extra code in order to handle ES6 modules
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../public"))); // same relative as from 'dist' folder - OK

// TEST
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticate, jobRouter);
app.use("/api/v1/users", authenticate, userRouter);

// CLIENT APP ROUTING...
// route all GET request to client app so they are handled by React Router
app.get("*", (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname, "../public", "index.html"))
);

// error middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5001;

const start = async () => {
  connectDB()
    .then(() => {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}`)
      );
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

start();
