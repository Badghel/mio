import { Router } from "express";

import { getUserController,createUserController,deleteUserController } from "../controllers/usuariosController";

const router = Router();

router.get("/",getUserController);
router.post("/",createUserController);
router.delete("/:id",deleteUserController);


export default router