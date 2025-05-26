import { Router } from "express";
import { CrearComprador, iniciarSesion } from "../controllers/user.controller";

import {
  CrearVendedor,
  iniciarSesionVendedor,
} from "../controllers/vendedor.controller";

const router = Router();

router.post("/comprador", CrearComprador);
router.post("/loginComprador", iniciarSesion);

//vendedor routes
router.post("/vendedor", CrearVendedor);
router.post("/loginVendedor", iniciarSesionVendedor);

export default router;
