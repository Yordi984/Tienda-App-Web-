import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Producto } from '../entities/producto.entity';

export async function crearProducto(req: Request, res: Response) {
  try {
    const {
      nombre,
      descripcion,
      disponibilidad,
      precio,
      vendedorId,
      whatsapp,
    } = req.body;

    const imagen = req.file?.filename; // nombre del archivo guardado

    const productoRepository = AppDataSource.getRepository(Producto);
    const newProducto = productoRepository.create({
      nombre,
      descripcion,
      disponibilidad,
      precio: Number(precio),
      whatsapp,
      imagen,
      vendedor: { id: vendedorId },
    });

    await productoRepository.save(newProducto);

    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
}

export function obtenerProductos(req: Request, res: Response) {
  const productoRepository = AppDataSource.getRepository('producto');

  const searchQuery = req.query.q;

  productoRepository
    .createQueryBuilder('producto')
    .where(
      'LOWER(producto.nombre) LIKE LOWER(:search) OR LOWER(producto.descripcion) LIKE LOWER(:search)',
      { search: `%${searchQuery || ''}%` },
    )
    .getMany()
    .then((productos) => {
      const parsedProducts = productos.map((producto) => {
        producto.imagen = `${process.env.API_URL}uploads/${producto.imagen.replace(/^\/+/, '')}`;

        return producto;
      });

      res.status(200).json(parsedProducts);
    })
    .catch((error) => {
      console.error('Error fetching productos:', error);
      res.status(500).json({ message: 'Error fetching productos' });
    });
}

export function eliminarProducto(req: Request, res: Response) {
  const { id } = req.params;
  const productoRepository = AppDataSource.getRepository('producto');
  productoRepository
    .delete(id)
    .then(() => {
      res.status(200).json({ message: 'Producto deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting producto:', error);
      res.status(500).json({ message: 'Error deleting producto' });
    });
}

export function editarProducto(req: Request, res: Response) {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  const productoRepository = AppDataSource.getRepository('producto');

  productoRepository
    .findOneBy({ id: parseInt(id) })
    .then((producto) => {
      if (!producto) {
        return res.status(404).json({ message: 'Producto not found' });
      }
      producto.nombre = nombre;
      producto.descripcion = descripcion;
      producto.precio = precio;

      return productoRepository.save(producto);
    })
    .then(() => {
      res.status(200).json({ message: 'Producto updated successfully' });
    })
    .catch((error) => {
      console.error('Error updating producto:', error);
      res.status(500).json({ message: 'Error updating producto' });
    });
}

export function obtenerProductoPorId(req: Request, res: Response) {
  const { id } = req.params;
  const productoRepository = AppDataSource.getRepository('producto');

  productoRepository
    .findOneBy({ id: parseInt(id) })
    .then((producto) => {
      if (!producto) {
        return res.status(404).json({ message: 'Producto not found' });
      }

      // Ajustar la URL completa de la imagen usando la variable de entorno API_URL
      if (producto.imagen) {
        producto.imagen = `${process.env.API_URL}uploads/${producto.imagen.replace(/^\/+/, '')}`;
      }

      res.status(200).json(producto);
    })
    .catch((error) => {
      console.error('Error fetching producto:', error);
      res.status(500).json({ message: 'Error fetching producto' });
    });
}

export function obtenerProductosPorVendedor(req: Request, res: Response) {
  const vendedorId = parseInt(req.params.id, 10);

  if (isNaN(vendedorId)) {
    return res.status(400).json({ message: 'ID de vendedor inválido' });
  }

  const productoRepository = AppDataSource.getRepository('producto');

  productoRepository
    .find({ where: { vendedor: { id: vendedorId } } })
    .then((productos) => {
      const parsedProducts = productos.map((producto) => {
        producto.imagen = `${process.env.API_URL}uploads/${producto.imagen.replace(/^\/+/, '')}`;
        return producto;
      });

      res.status(200).json(parsedProducts);
    })
    .catch((error) => {
      console.error('Error fetching productos by vendor:', error);
      res.status(500).json({ message: 'Error fetching productos by vendor' });
    });
}




