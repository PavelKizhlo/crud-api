import * as dotenv from "dotenv";
import * as http from "http";

dotenv.config();

const PORT = +(<string>process.env["PORT"]) || 3000;
const HOSTNAME = <string>process.env["HOSTNAME"];

const server = http.createServer((req, res) => {
  const route = req.url;
  const { method } = req;

  if (route === "/api/users" && method === "GET") {
    console.log("get all");
  } else if (route === "/api/users" && method === "POST") {
    console.log("create new");
  } else if (route?.match(/\/api\/users\/[0-9]+/) && method === "GET") {
    console.log("get one");
  } else if (route?.match(/\/api\/users\/[0-9]+/) && method === "PUT") {
    console.log("update one");
  } else if (route?.match(/\/api\/users\/[0-9]+/) && method === "DELETE") {
    console.log("delete one");
  } else {
    console.log("404");
  }

  res.end();
});

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

server.on("error", (err) => console.log(err.message));
