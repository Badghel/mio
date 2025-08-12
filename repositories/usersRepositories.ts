import { db } from "../data/db";
import { User } from "../models/users";
import { ResultSetHeader,RowDataPacket } from "mysql2";

//REPOSITORIO = ENGLOBA OPERACIONES CON LA BASE DE DATOS ADD/DELETE/PUT

//get
export const getUserAll = async ():Promise<User[]>=>{
    const [rows] = await db.query('SELECT * FROM users');
    return rows as User[];
}
export const getUserById = async (id:number):Promise<User| null>=>{
    const sql = "SELECT * FROM user where id= ?";
    const [rows] = await db.query<RowDataPacket[]>(sql,[id]);
    if(rows.length ===0){
        return null;
    }
    return rows[0] as User;
}

export const getUserByUsername = async(username:string):Promise<User | null> =>{
    const [rows]= await db.query("SELECT * FROM users WHERE username =?",[username]);

    const users = rows as User[];
    if(users.length ===0){
        return null;
    }
    return users[0];
}

//add (reformulado)
export const createUser = async(user:User):Promise<number>=>{
    const [result] = await db.query<ResultSetHeader>('INSERT INTO users(username,password) VALUES (?,?)',[user.username,user.password]);
    const insertId = result.insertId;
    return insertId;
};


//delete
export const deleteUser = async (id:number):Promise<number>=>{
    const [result] = await db.query<ResultSetHeader>('DELETE FROM users where id= ?',[id]);
    const resultId= result.affectedRows;
    return resultId;
}

