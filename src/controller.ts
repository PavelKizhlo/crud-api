import { v4 as uuidv4, validate } from "uuid";
import type { User, UserBody } from "./interfaces/interfaces.js";
import db from "./db/database.js";
import checkUser from "./utils/checkUser.js";
import ControllerError from "./errors/controllerError.js";

const getAllUsers = async (): Promise<User[]> => {
  return new Promise<User[]>((resolve) => {
    resolve(db.users);
  });
};

const getUser = async (id: string): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    const isValidId = validate(id);
    if (!isValidId)
      reject(new ControllerError("User id is invalid (not uuid)", 400));
    const user = db.findById(id);
    if (user) {
      resolve(user);
    } else {
      reject(new ControllerError(`User with id ${id} not found`, 404));
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
      reject(
        new ControllerError("Request body doesn't contain required fields", 400)
      );
    }
  });
};

const updateUser = async (id: string, userData: UserBody): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    const isValidId = validate(id);
    const isCorrectBody = checkUser(userData);
    if (!isValidId)
      reject(new ControllerError("User id is invalid (not uuid)", 400));
    if (!isCorrectBody)
      reject(
        new ControllerError("Request body doesn't contain required fields", 400)
      );
    const user = db.updateUser(id, userData);
    if (user) {
      resolve(user);
    } else {
      reject(new ControllerError(`User with id ${id} not found`, 404));
    }
  });
};

const deleteUser = async (id: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const isValidId = validate(id);
    if (!isValidId)
      reject(new ControllerError("User id is invalid (not uuid)", 400));
    const user = db.findById(id);
    if (user) {
      db.deleteUser(id);
      resolve(`User with id ${id} deleted successfully`);
    } else {
      reject(new ControllerError(`User with id ${id} not found`, 404));
    }
  });
};

export { getAllUsers, getUser, createNewUser, updateUser, deleteUser };
