import {Request,Response} from "express";
import { getUserAll,deleteUser } from "../repositories/usersRepositories";
import { addUser } from "../services/addUserServices";
import { User } from "../models/users";
import { Result } from "../models/abstractions/result";
import { deleteUserService } from "../services/deleteUserService";
import { getUserAllService } from "../services/getUserService";

//LOGICA DE LOS CONTROLLERS
//CONTROLLER= GESTIONA LAS RUTAS A QUE PARTE DE LA CAPA SERVICIO VAN
//get
export const getUserController = async (req:Request, res:Response)=>{
    const result = await getUserAllService();
    if(result.isFailure) return res.status(404).json({mensaje:result.errorMessage});
    return res.status(200).json({mensaje:result.data});
}

//post 
export const addUserController = async (req: Request, res: Response) => {
  const userData = req.body as User;
  const result = await addUser(userData);
  if(result.isFailure) return res.status(404).json({mensaje:result.errorMessage});
  return res.status(200).json({mensaje: result.data});
};

//Delete 
export const deleteUserController = async(req:Request, res:Response)=>{
        const id = Number(req.params.id);
        const del = await deleteUserService(id);
        if(del.isFailure)return res.status(404).json({mensaje:del.errorMessage});
        res.status(201).json({mensaje: del.data});
}
