import { db } from "../data/db";
import { User } from "../models/usuarios";
import { ResultSetHeader,RowDataPacket } from "mysql2";

//REPOSITORIO = ENGLOBA OPERACIONES CON LA BASE DE DATOS ADD/DELETE/PUT

//get
export const getUserAll = async ():Promise<User[]>=>{
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows as User[];
}
export const getUserById = async (id:number):Promise<User| null>=>{
    const sql = "SELECT * FROM usuarios where id= ?";
    const [rows] = await db.query<RowDataPacket[]>(sql,[id]);
    if(rows.length ===0){
        return null;
    }
    return rows[0] as User;
}

//add (reformulado)
export const createUser = async(user:User):Promise<number>=>{
    const [result] = await db.query<ResultSetHeader>('INSERT INTO usuarios(nombre,apellido) VALUES (?,?)',[user.nombre,user.apellido]);
    const insertId = result.insertId;
    return insertId;
};
//delete
export const deleteUser = async (id:number):Promise<number>=>{
    const [result] = await db.query<ResultSetHeader>('DELETE FROM usuarios where id= ?',[id]);
    const resultId= result.affectedRows;
    return resultId;
}

