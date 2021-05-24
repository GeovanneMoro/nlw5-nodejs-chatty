import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import path from "path";
import { Server, Socket } from "socket.io";

import "express-async-errors";
import { AppError } from "../../errors/AppError";
import createConnection from "../typeorm";
import "../../container";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.static(path.join(__dirname, "..", "..", "..", "..", "public"))); // acessando pasta public
app.set("views", path.join(__dirname, "..", "..", "..", "..", "public"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
  return response.render("html/client.html");
});

const http = createServer(app); // criando protocolo http
const io = new Server(http); // criando protocolo ws

io.on("connection", (socket: Socket) => {
  console.log("Se conectou", socket.id);
});

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

export { http, io };
