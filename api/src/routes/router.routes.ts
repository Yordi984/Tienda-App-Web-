import { Router } from "express";
import { CrearComprador, iniciarSesion } from "../controllers/user.controller";

import {
  CrearVendedor,
  iniciarSesionVendedor,
} from "../controllers/vendedor.controller";

import {
  CrearProducto,
  obtenerProductos,
  editarProducto,
  eliminarProducto,
} from "../controllers/producto.controller";

import {
  registrarComprador,
  registrarVendedor,
  solicitarRecuperacion,
  restablecerPassword,
} from "../controllers/autenticacion.controller";

import passport from "passport";

const router = Router();
//comprador routes
router.post("/comprador", CrearComprador);
router.post("/loginComprador", iniciarSesion);

//vendedor routes
router.post("/vendedor", CrearVendedor);
router.post("/loginVendedor", iniciarSesionVendedor);

//producto routes
router.post("/producto", CrearProducto);
router.get("/productos", obtenerProductos);
router.put("/producto/:id", editarProducto);
router.delete("/producto/:id", eliminarProducto);

//passpot local

router.post("/registrar/comprador", registrarComprador);
router.post("/registrar/vendedor", registrarVendedor);
router.post("/recuperar", solicitarRecuperacion);
router.post("/restablecer/:token", restablecerPassword);

export default router;
