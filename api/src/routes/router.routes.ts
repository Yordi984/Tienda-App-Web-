import { Router } from "express";
import { saludar } from "../controllers/user.controller";

const router = Router();

router.get("/saludo", saludar);

export default router;
