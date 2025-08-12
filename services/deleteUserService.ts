import { deleteUser } from "../repositories/usersRepositories";  

import { Result } from "../models/abstractions/result";

export const deleteUserService = async(id:number):Promise<Result<number>>=>{
    try{
        const deleted= await deleteUser(id);
        if(deleted ===  0) return Result.fail<number>("no se encontro el usuario");
        return Result.ok<number>(id);
    }catch(err){
        return Result.fail<number>("error al eliminarlooo");
    }
}