
import { Router } from "express";
import { crearComprador, iniciarSesion } from "../controllers/user.controller";
import multer from "multer";

import {
  crearVendedor,
  obtenerMisProductos
 
} from "../controllers/vendedor.controller";

import {
  crearProducto,
  obtenerProductos,
  editarProducto,
  eliminarProducto,
 obtenerProductoPorId
} from "../controllers/producto.controller";

import {
  registrarComprador,
  registrarVendedor,
  solicitarRecuperacion,
  restablecerPassword,
} from "../controllers/autenticacion.controller";

import { upload } from '../middlewares/upload'; // ruta según tu estructura





const router = Router();
//login para los 2 tipos de usuarios
router.post("/login", iniciarSesion);
router.post("/login", iniciarSesion);

//comprador routes
router.post("/comprador", crearComprador);


//vendedor routes
router.post("/vendedor", crearVendedor);
router.get("/mis-productos", obtenerMisProductos);



//producto routes
router.post("/producto", upload.single('imagen'), crearProducto);

router.get("/productos", obtenerProductos);
router.get("/producto/:id", obtenerProductoPorId);
router.put("/producto/:id", editarProducto);
router.delete("/producto/:id", eliminarProducto);

//passpot local

router.post("/registrar/comprador", registrarComprador);
router.post("/registrar/vendedor", registrarVendedor);
router.post("/recuperar", solicitarRecuperacion);
router.post("/restablecer/:token", restablecerPassword);

export default router;
