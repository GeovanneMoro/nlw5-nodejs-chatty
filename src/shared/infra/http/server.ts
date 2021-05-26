import { http } from "./app";
import "./websocket/client";
import "./websocket/admin";

const port = process.env.PORT || 3333;

http.listen(port, () => console.log("Server is running!"));
