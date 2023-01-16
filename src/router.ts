import type * as http from "http";
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./controller.js";
import getReqBody from "./utils/getReqBody.js";
import type { UserBody } from "./interfaces/interfaces.js";
import ControllerError from "./errors/controllerError.js";

class Router {
  private readonly req: http.IncomingMessage;

  private res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  };

  private readonly route: string;

  private readonly method: string;

  constructor(
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) {
    this.req = req;
    this.res = res;
    this.route = <string>req.url;
    this.method = <string>req.method;
  }

  async start(): Promise<void> {
    const routeWithId = /\/api\/users\/[^/]+$/.test(this.route);
    const id = routeWithId ? <string>this.route.split("/")[3] : null;

    if (this.route === "/api/users" && this.method === "GET") {
      try {
        const users = await getAllUsers();
        this.sendResponse(200, users);
      } catch (err) {
        this.handleErrors(err);
      }
    } else if (this.route === "/api/users" && this.method === "POST") {
      try {
        const userData = await getReqBody(this.req);
        const user = await createNewUser(<UserBody>JSON.parse(userData));
        this.sendResponse(201, user);
      } catch (err) {
        this.handleErrors(err);
      }
    } else if (routeWithId && this.method === "GET") {
      try {
        const user = await getUser(<string>id);
        this.sendResponse(200, user);
      } catch (err) {
        this.handleErrors(err);
      }
    } else if (routeWithId && this.method === "PUT") {
      try {
        const userData = await getReqBody(this.req);
        const updatedUser = await updateUser(
          <string>id,
          <UserBody>JSON.parse(userData)
        );
        this.sendResponse(200, updatedUser);
      } catch (err) {
        this.handleErrors(err);
      }
    } else if (routeWithId && this.method === "DELETE") {
      try {
        const message = await deleteUser(<string>id);
        this.sendResponse(204, { message });
      } catch (err) {
        this.handleErrors(err);
      }
    } else {
      this.sendResponse(404, { message: "Route not found" });
    }
  }

  sendResponse(statusCode: number, resBody: unknown) {
    this.res.writeHead(statusCode, { "Content-Type": "application/json" });
    this.res.end(JSON.stringify(resBody));
  }

  handleErrors(err: unknown) {
    if (err instanceof ControllerError) {
      this.sendResponse(err.code, { message: err.message });
    } else {
      this.sendResponse(500, { message: "Internal server error" });
    }
  }
}

export default Router;
