
import { Router } from "express";
import { crearComprador, iniciarSesion } from "../controllers/user.controller";

import {
  crearVendedor,
  iniciarSesionVendedor,
} from "../controllers/vendedor.controller";

import {
  crearProducto,
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



const router = Router();
//comprador routes
router.post("/comprador", crearComprador);
router.post("/loginComprador", iniciarSesion);

//vendedor routes
router.post("/vendedor", crearVendedor);
router.post("/loginVendedor", iniciarSesionVendedor);

//producto routes
router.post("/producto", crearProducto);
router.get("/productos", obtenerProductos);
router.put("/producto/:id", editarProducto);
router.delete("/producto/:id", eliminarProducto);

//passpot local

router.post("/registrar/comprador", registrarComprador);
router.post("/registrar/vendedor", registrarVendedor);
router.post("/recuperar", solicitarRecuperacion);
router.post("/restablecer/:token", restablecerPassword);

export default router;
