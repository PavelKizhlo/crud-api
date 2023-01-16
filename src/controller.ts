import { v4 as uuidv4, validate } from "uuid";
import type { User, UserBody } from "./interfaces/interfaces.js";
import db from "./db/database.js";
import checkUser from "./utils/checkUser.js";

const getAllUsers = async (): Promise<User[]> => {
  return new Promise<User[]>((resolve) => {
    resolve(db.users);
  });
};

const getUser = async (id: string): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    const isValidId = validate(id);
    if (!isValidId) reject(new Error("User id is invalid (not uuid)"));
    const user = db.findById(id);
    if (user) {
      resolve(user);
    } else {
      reject(new Error(`User with id ${id} not found`));
    }
  });
};

const createNewUser = async (userData: UserBody): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    const isCorrectBody = checkUser(userData);
    if (isCorrectBody) {
      const userId = uuidv4();
      const newUser = { ...userData, id: userId };
      db.addUser(newUser);
      resolve(newUser);
    } else {
      reject(new Error("Request body doesn't contain required fields"));
    }
  });
};

const updateUser = async (id: string, userData: UserBody): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    const isValidId = validate(id);
    const isCorrectBody = checkUser(userData);
    if (!isValidId) reject(new Error("User id is invalid (not uuid)"));
    if (!isCorrectBody)
      reject(new Error("Request body doesn't contain required fields"));
    let user = db.findById(id);
    if (user) {
      user = { ...userData, id };
      resolve(user);
    } else {
      reject(new Error(`User with id ${id} not found`));
    }
  });
};

const deleteUser = async (id: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const isValidId = validate(id);
    if (!isValidId) reject(new Error("User id is invalid (not uuid)"));
    const user = db.findById(id);
    if (user) {
      db.deleteUser(id);
      resolve(`User with id ${id} deleted successfully`);
    } else {
      reject(new Error(`User with id ${id} not found`));
    }
  });
};

export { getAllUsers, getUser, createNewUser, updateUser, deleteUser };
