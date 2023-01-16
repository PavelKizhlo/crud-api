import type { User } from "../interfaces/interfaces.js";

class Database {
  private _users: User[] = [];

  get users() {
    return this._users;
  }

  findById(id: string): User | undefined {
    return this._users.find((user) => user.id === id);
  }

  addUser(user: User): void {
    this._users.push(user);
  }

  deleteUser(id: string) {
    this._users = this._users.filter((user) => user.id !== id);
  }
}

export default new Database();
