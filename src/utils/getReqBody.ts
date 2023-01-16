import type * as http from "http";

function getReqBody(req: http.IncomingMessage): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export default getReqBody;
