
import { Router } from "express";
import { crearComprador, iniciarSesion } from "../controllers/user.controller";
import multer from "multer";

import {
  crearVendedor,
 
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


const upload = multer({ dest: 'uploads/' }); // Ajusta la configuración según tus necesidades

const router = Router();
//login para los 2 tipos de usuarios
router.post("/login", iniciarSesion);
router.post("/login", iniciarSesion);

//comprador routes
router.post("/comprador", crearComprador);


//vendedor routes
router.post("/vendedor", crearVendedor);


//producto routes
router.post("/producto", upload.single('imagen'), crearProducto);
router.get("/productos", obtenerProductos);
router.put("/producto/:id", editarProducto);
router.delete("/producto/:id", eliminarProducto);

//passpot local

router.post("/registrar/comprador", registrarComprador);
router.post("/registrar/vendedor", registrarVendedor);
router.post("/recuperar", solicitarRecuperacion);
router.post("/restablecer/:token", restablecerPassword);

export default router;
