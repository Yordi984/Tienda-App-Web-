import { Router } from 'express';
import { crearComprador, iniciarSesion } from '../controllers/user.controller';

import {
  crearVendedor,
  obtenerMisFavoritosVendedor,
} from '../controllers/vendedor.controller';

import {
  crearProducto,
  editarProducto,
  eliminarProducto,
  obtenerMisProductos,
  obtenerProductoPorId,
  obtenerProductos,
} from '../controllers/producto.controller';

import {
  registrarVendedor,
  restablecerPassword,
  solicitarRecuperacion,
} from '../controllers/autenticacion.controller';

import {
  Favorito,
  obtenerMisFavoritos,
} from '../controllers/favoritos.controller';

import { upload } from '../middlewares/upload'; // ruta según tu estructura

const router = Router();
//login para los 2 tipos de usuarios
router.post('/login', iniciarSesion);

//comprador routes
router.post('/comprador', crearComprador);

//vendedor routes
router.post('/vendedor', crearVendedor);

//producto routes
router.post('/producto', upload.single('imagen'), crearProducto);

router.get('/productos', obtenerProductos);
router.get('/producto/:id', obtenerProductoPorId);
router.put('/producto/:id', upload.single('imagen'), editarProducto);
router.delete('/producto/:id', eliminarProducto);
router.get('/mis-productos/:vendedorId', obtenerMisProductos);
router.get('/vendedores/:vendedorId/favoritos', obtenerMisFavoritosVendedor);

//passpot local

router.post('/registrar/vendedor', registrarVendedor);
router.post('/recuperar', solicitarRecuperacion);
router.post('/restablecer/:token', restablecerPassword);

//Favoritos

router.post('/favorito/:productoId', Favorito);
router.get('/mis-favoritos/:vendedorId', obtenerMisFavoritos);

export default router;
