import * as dotenv from "dotenv";
import * as http from "http";

dotenv.config();

const PORT = +(<string>process.env["PORT"]);
const HOSTNAME = <string>process.env["HOSTNAME"];

const server = http.createServer((_req, _res) => {
  console.log("request");
});

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

server.on("error", (err) => console.log(err.message));
