import { db } from "../data/db";
import { RowDataPacket } from "mysql2";
import { User } from "../models/usuarios";

export const getUserById = async (id:number):Promise<User| null>=>{
    const sql = "SELECT * FROM usuarios where id= ?";
    const [rows] = await db.query<RowDataPacket[]>(sql,[id]);
    if(rows.length ===0){
        return null;
    }
    return rows[0] as User;
}