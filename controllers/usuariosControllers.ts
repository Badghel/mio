import {Request,Response} from "express";
import {db} from "../data/db";
import { Usuario } from "../models/usuarios";

//LOGICA DE LOS CONTROLLERS

//get
export const getUsuarios = (req:Request, res:Response)=>{
    res.json(usuarios);
}

//post
export const createUsuario = (req:Request, res:Response):void=>{
    const {nombre,apellido} = req.body;
    const nuevoUsuario: Usuario ={
        id: usuarios.length+1,
        nombre,
        apellido,
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
}   

//Delete
export const deleteUsuario = (req:Request, res:Response): void=>{
    const idDelete= parseInt(req.params.id);
    const index =usuarios.findIndex((u)=> u.id === idDelete);

    if(index===-1){
        res.status(404).json({mensaje: "usuario no encontrado"});
        return;
    }

    const usuarioEliminado =usuarios.splice(index,1)[0];
    res.status(200).json({mensaje: "usuario eliminado",usuario:usuarioEliminado});
}
