import { createUser } from "../repositories/usuariosRepositories";
import { User } from "../models/usuarios";
import { Result } from "../models/abstractions/result"; 

export const addUser = async (user: User): Promise<Result<number>> => {
  try {
    const createdUser = await createUser(user); 
    return Result.ok<number>(createdUser);
  } catch (err) {
    return Result.fail<number>("Error al crear el usuario");
  }
};