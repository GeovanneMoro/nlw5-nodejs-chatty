import { http } from "./app";
import "./websocket/client";

const port = process.env.PORT || 3333;

http.listen(port, () => console.log("Server is running!"));
