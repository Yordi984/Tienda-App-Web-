import { Request, Response } from 'express';
import { AppDataSource } from '../db';

export function crearVendedor(req: Request, res: Response) {
  const repositorio = AppDataSource.getRepository('vendedor');
  const { nombre, telefono, correo, password } = req.body;
  const nuevoVendedor = repositorio.create({
    nombre,
    telefono,
    correo,
    password,
  });
  repositorio
    .save(nuevoVendedor)
    .then(() => {
      res.status(201).json({ message: 'Vendedor created successfully' });
    })
    .catch((error) => {
      console.error('Error creating vendedor:', error);
      res.status(500).json({ message: 'Error creating vendedor' });
    });
}

export function obtenerMisProductos(req: Request, res: Response) {
  const repositorio = AppDataSource.getRepository('vendedor');
  const vendedorId = req.params.id;

  repositorio
    .findOne({
      where: { id: vendedorId },
      relations: ['productos'], // trae también productos relacionados
    })
    .then((vendedor) => {
      if (!vendedor) {
        return res.status(404).json({ message: 'Vendedor no encontrado' });
      }
      res.status(200).json(vendedor.productos);
    })
    .catch((error) => {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ message: 'Error al obtener los productos' });
    });
}

export function obtenerMisFavoritosVendedor(req: Request, res: Response) {
  const vendorRepository = AppDataSource.getRepository('vendedor');
  const vendedorId = req.params.vendedorId;

  vendorRepository
    .findOne({
      where: { id: vendedorId },
      relations: { favoritos: true },
    })
    .then((vendedor) => {
      if (!vendedor) {
        return res.status(404).json({ message: 'Vendedor no encontrado' });
      }

      res.status(200).json(vendedor.favoritos);
    })
    .catch((error) => {
      console.error('Error al obtener los favoritos:', error);
      res.status(500).json({ message: 'Error al obtener los productos' });
    });
}
