import { db } from "../data/db";
import { Patentes } from "../models/patentes";
import { ResultSetHeader} from "mysql2";

//get
export const getPatentes = async():Promise<Patentes[]>=>{
    const [rows] = await db.query("SELECT * FROM dominios");
    return rows as Patentes[];
}


//create

export const createPatentes = async(numero_patente:string,usuario_id:number):Promise<Patentes>=>{
    const [result] = await db.query<ResultSetHeader>("INSERT INTO dominios(numero_patente,usuario_id)VALUES (?,?)",[numero_patente,usuario_id]);
    const insertId= result.insertId;
    return {id:insertId,numero_patente,usuario_id};
}

//update

export const updatePatentes = async(numero_patente:string, usuario_id:number): Promise<void>=>{
    const update = "UPDATE dominios SET usuario_id = ? where numero_patente= ?";
    const [result] = await db.query<ResultSetHeader>(update,[usuario_id,numero_patente]);
    if(result.affectedRows === 0){
        throw new Error("patente no existe");
    }
}
