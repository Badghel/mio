import {Request,Response} from "express";
import {usuarios,patentes} from "../data/db";

//LOGICA DE LOS CONTROLLERS

//get
export const getUsuarios = (req:Request, res:Response)=>{
    res.json(usuarios);
}


