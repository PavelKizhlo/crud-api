import * as dotenv from "dotenv";
import * as http from "http";
import type { RequestListener } from "http";
import Router from "./router.js";

dotenv.config();

const PORT = +(<string>process.env["PORT"]) || 3000;
const HOSTNAME = <string>process.env["HOSTNAME"];

const server = http.createServer((async (req, res) => {
  const router = new Router(req, res);
  await router.start();

  res.end();
}) as RequestListener);

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

server.on("error", (err) => console.log(err.message));

export default server;
