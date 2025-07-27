import {Request,Response} from "express";
import { getUser, createUser,deleteUser } from "../repositories/usuariosRepositories";

//LOGICA DE LOS CONTROLLERS

//get
export const getUserController = async (req:Request, res:Response)=>{
    try{
        const usuarios = await getUser();
        res.json(usuarios);
    }catch(error){
        res.status(500).json({mensaje:"Error al obtener usuarios",error});

    }
}

//post
export const createUserController = async(req:Request, res:Response)=>{
    try{
        const {nombre,apellido} = req.body; //Req = request
        const newUser= await createUser(nombre,apellido);
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({mensaje: "Error al crear usuario"});
    }
}   

//Delete
export const deleteUserController = async(req:Request, res:Response)=>{
   try{
        const id = Number(req.params.id);
        const del = await deleteUser(id);
        
        if(!del){
            return res.status(404).json({mensaje: "usuario no encontrado"});
        }
        res.status(201).json({mensaje: "Usuario eliminado"});
   }catch(err){
    res.status(500).json({mensaje: "Error al eliminar usuario"});
   }
}
