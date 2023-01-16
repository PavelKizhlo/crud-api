import type { UserBody } from "../interfaces/interfaces.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUser(body: any): body is UserBody {
  return (
    (body as UserBody).age !== undefined &&
    (body as UserBody).username !== undefined &&
    (body as UserBody).hobbies !== undefined &&
    (body as UserBody).age > 0
  );
}

export default isUser;
