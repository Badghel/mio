import { Router } from "express";

import { getUsuarios,createUsuario,deleteUsuario } from "../controllers/usuariosControllers";

const router = Router();

router.get("/",getUsuarios);
router.post("/",createUsuario);
router.delete("/:id",deleteUsuario);
export default router