import { Router } from "express";
import { CrearComprador } from "../controllers/user.controller";

const router = Router();

router.post("/comprador", CrearComprador);

export default router;
