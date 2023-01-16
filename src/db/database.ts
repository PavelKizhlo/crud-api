import type { User, UserBody } from "../interfaces/interfaces.js";

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

  updateUser(id: string, userData: UserBody): User | undefined {
    const userToUpdate = this._users.find((user) => user.id === id);
    if (userToUpdate) {
      userToUpdate.age = userData.age;
      userToUpdate.username = userData.username;
      userToUpdate.hobbies = userData.hobbies;
    }
    return userToUpdate;
  }

  deleteUser(id: string): void {
    this._users = this._users.filter((user) => user.id !== id);
  }
}

export default new Database();
