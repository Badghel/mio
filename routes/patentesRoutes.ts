import { Router } from "express";
import { getPatentesController,createPatentesController,updatePatentesController } from "../controllers/patentesController";

const router = Router();

router.get("/",getPatentesController);
router.post("/",createPatentesController);
router.put("/:numero_patente",updatePatentesController);


export default router