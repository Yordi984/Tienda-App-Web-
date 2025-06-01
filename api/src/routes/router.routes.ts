import { Router } from 'express';
import { crearComprador, iniciarSesion } from '../controllers/user.controller';
// Make sure that 'iniciarSesion' is exported as a function with the signature (req: Request, res: Response) => void | Promise<void>

import {
  crearVendedor,
  iniciarSesionVendedor,
} from '../controllers/vendedor.controller';

import {
  crearProducto,
  editarProducto,
  eliminarProducto,
  obtenerProductos,
} from '../controllers/producto.controller';

const router = Router();
//comprador routes
router.post('/comprador', crearComprador);
router.post('/loginComprador', iniciarSesion);

//vendedor routes
router.post('/vendedor', crearVendedor);
router.post('/loginVendedor', iniciarSesionVendedor);

//producto routes
router.post('/productos', crearProducto);
router.get('/productos', obtenerProductos);
router.put('/productos/:id', editarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;
