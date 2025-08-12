import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../repositories/usersRepositories';
import { Result } from '../models/abstractions/result';
import dotenv from 'dotenv';
dotenv.config();


//REVISAR BIEN ESTA LOGICA NO ME CONVENCE COMO MANEJO EL JWT TOKEN
const JWT_SECRET= process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en .env');
}

export const loginService = async(username:string,password:string): Promise<Result<{token:string}>>=>{
    try{
        const user = await getUserByUsername(username);
        if(!user) return Result.fail("Usuario no encontrado");

        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            return Result.fail("Usuario o contraseña incorrectos");
        }

        const token = jwt.sign(
            {id:user.id,username:user.username},
            JWT_SECRET,
            {expiresIn:'1h'}  //VER QUE HACER PARA QUE EL TOKEN NO EXPIRE O SE REFRESQUE PORQUE SINO CADA 1H O LO Q SEA NOS SACA DE LA PAGINA
        );
        return Result.ok({token});
    } catch (error) {
    console.error(error);
    return Result.fail('Error en el proceso de autenticación');
  }
};

    
