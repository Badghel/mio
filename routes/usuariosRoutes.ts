import { Router } from "express";

import { getUserController,addUserController,deleteUserController } from "../controllers/usuariosController";

const router = Router();

router.get("/",getUserController);
router.post("/",addUserController);
router.delete("/:id",deleteUserController);


export default router