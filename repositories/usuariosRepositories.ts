import { db } from "../data/db";
import { Usuario } from "../models/usuarios";
import { ResultSetHeader } from "mysql2";


//get
export const getUsuarios = async ():Promise<Usuario[]>=>{
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows as Usuario[];
}

//create
export const createUsuario = async (nombre:string,apellido:string):Promise<Usuario>=>{
    const [result] = await db.query<ResultSetHeader>('INSERT INTO usuarios(nombre,apellido) VALUES (?,?)',[nombre,apellido]);
    const insertId = result.insertId;
    return {id:insertId,nombre,apellido};
};
//delete
export const deleteUsuario = async (id:number):Promise<boolean>=>{
    const [result] = await db.query<ResultSetHeader>('DELETE FROM usuarios where id= ?',[id]);
    return result.affectedRows>0;
}

