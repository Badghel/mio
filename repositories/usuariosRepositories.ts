import { db } from "../data/db";
import { User } from "../models/usuarios";
import { ResultSetHeader } from "mysql2";


//get
export const getUser = async ():Promise<User[]>=>{
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows as User[];
}

//create
export const createUser = async (nombre:string,apellido:string):Promise<User>=>{
    const [result] = await db.query<ResultSetHeader>('INSERT INTO usuarios(nombre,apellido) VALUES (?,?)',[nombre,apellido]);
    const insertId = result.insertId;
    return {id:insertId,nombre,apellido};
};
//delete
export const deleteUser = async (id:number):Promise<boolean>=>{
    const [result] = await db.query<ResultSetHeader>('DELETE FROM usuarios where id= ?',[id]);
    return result.affectedRows>0;
}

