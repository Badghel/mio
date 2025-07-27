import { Request, Response } from "express";
import { getPatentes,createPatentes,updatePatentes } from "../repositories/patentesRepositories";
import { getUserById } from "../services/getUserById";

//LOGICA CONTROLLER PATENTES

//get

export const getPatentesController = async(req:Request,res:Response)=>{
    try{
        const patentes = await getPatentes();
        res.json(patentes);
    }catch(err){
        res.status(500).json({mensaje: "Error al obtener usuarios ",err});
    }
}

//create

export const createPatentesController = async (req:Request, res:Response)=>{
    try{
        const {numero_patente,usuario_id} = req.body;
        const newPatente= await createPatentes(numero_patente,usuario_id);
        res.status(201).json(newPatente);
    }catch(err){
        res.status(500).json({mensaje: "Error al crear usuario",err});
    }
}

//update

export const updatePatentesController = async(req:Request, res:Response)=>{
    try{
        const {numero_patente} = req.params;
        const usuario_id = Number(req.body.usuario_id);

        if(!numero_patente){
            return res.status(400).json({mensaje: "Ingrese la patente"});
        }
        if(isNaN(usuario_id)){
            return res.status(400).json({mensaje:"usuario_id no es un numero valido"});
        }

        const usuario = await getUserById(usuario_id);

        if(!usuario){
            return res.status(400).json({mensaje:"usuario no encontrado"});
        }
        await updatePatentes(numero_patente,usuario_id);
        res.json({mensaje:"Titularidad actualizada"});
    }catch (error:any){
        if(error.message === "patente no existe"){
            return res.status(404).json({mensaje:"Patente no encontrada"});
        }
        console.error(error);
        res.status(500).json({mensaje:"Error en el servidor"});
    }
}