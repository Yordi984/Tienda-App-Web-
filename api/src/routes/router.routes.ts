import { Router } from 'express';
import { CrearComprador, iniciarSesion } from '../controllers/user.controller';
// Make sure that 'iniciarSesion' is exported as a function with the signature (req: Request, res: Response) => void | Promise<void>

import {
  CrearVendedor,
  iniciarSesionVendedor,
} from '../controllers/vendedor.controller';

import {
  CrearProducto,
  obtenerProductos,
  editarProducto,
  eliminarProducto,
} from '../controllers/producto.controller';

const router = Router();
//comprador routes
router.post('/comprador', CrearComprador);
router.post('/loginComprador', iniciarSesion);

//vendedor routes
router.post('/vendedor', CrearVendedor);
router.post('/loginVendedor', iniciarSesionVendedor);

//producto routes
router.post('/producto', CrearProducto);
router.get('/productos', obtenerProductos);
router.put('/producto/:id', editarProducto);
router.delete('/producto/:id', eliminarProducto);

export default router;
