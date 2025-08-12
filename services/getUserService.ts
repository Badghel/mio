import { User } from "../models/users";
import { Result } from "../models/abstractions/result";
import { getUserAll } from "../repositories/usersRepositories";

export const getUserAllService = async():Promise<Result<User[]>>=>{
    try{
        const getAllUser = await getUserAll();  
        
        if(getAllUser.length===0){
            return Result.fail<User[]>("No se encontro ningun usuario creado");
        }
        return Result.ok<User[]>(getAllUser);
    }catch(err){
        return Result.fail<User[]>("error al obtener usuarios");
    }
}