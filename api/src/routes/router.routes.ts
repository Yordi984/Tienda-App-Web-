
import { Router } from "express";
import { crearComprador, iniciarSesion, editarUsuario, eliminarUsuario,obtenerInfoDeUsuario } from "../controllers/user.controller";
import multer from "multer";

import {
  crearVendedor,


 
} from "../controllers/vendedor.controller";

import {
  crearProducto,
  obtenerProductos,
  editarProducto,
  eliminarProducto,
 obtenerProductoPorId,
 obtenerMisProductos
} from "../controllers/producto.controller";

import {
 
  registrarVendedor,
  solicitarRecuperacion,
  restablecerPassword,
} from "../controllers/autenticacion.controller";

import { Favorito, obtenerMisFavoritos } from "../controllers/favoritos.controller";

import { upload } from '../middlewares/upload'; // ruta según tu estructura





const router = Router();
//login para los 2 tipos de usuarios
router.post("/login", iniciarSesion);


//comprador routes
router.post("/comprador", crearComprador);


//vendedor routes
router.post("/vendedor", crearVendedor);




//producto routes
router.post("/producto", upload.single('imagen'), crearProducto);

router.get("/productos", obtenerProductos);
router.get("/producto/:id", obtenerProductoPorId);
router.put("/producto/:id",upload.single('imagen'), editarProducto);
router.delete("/producto/:id", eliminarProducto);
router.get("/mis-productos/:vendedorId", obtenerMisProductos);

//passpot local


router.post("/registrar/vendedor", registrarVendedor);
router.post("/recuperar", solicitarRecuperacion);
router.post("/restablecer/:token", restablecerPassword);

//Favoritos 

router.post("/favorito/:productoId", Favorito);
router.get("/mis-favoritos/:vendedorId", obtenerMisFavoritos);


//crud usuario
router.get("/perfil", obtenerInfoDeUsuario)
router.put("/perfiledit", editarUsuario)
router.delete("/perfil/:id", eliminarUsuario)
export default router;
