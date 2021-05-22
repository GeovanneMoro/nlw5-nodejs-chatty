import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";
import { AppError } from "../../errors/AppError";
import createConnection from "../typeorm";
import "../../container";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "GET funcionou!" });
});

app.post("/", (request, response) => {
  const { name } = request.body;

  return response.json({ message: `${name}, o POST funcionou!` });
});

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
