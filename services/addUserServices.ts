import { createUser } from "../repositories/usersRepositories";
import { User } from "../models/users";
import { Result } from "../models/abstractions/result"; 
import bcrypt from 'bcrypt';

export const addUser = async (user: User): Promise<Result<number>> => {
  try {
    const saltRounds= 10;
    const hashedPassword = await bcrypt.hash(user.password,saltRounds);
    const userToCreate = {...user,password:hashedPassword};
    const createdUser = await createUser(userToCreate);
    return Result.ok<number>(createdUser);
  } catch (err) {
    return Result.fail<number>("Error al crear el usuario");
  }
};