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
      categoria
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

  const search = req.query.q;
  const category = req.query.filter;
  const vendedorId = req.query.vendedorId;

  console.log('-'.repeat(50), 'Query Parameters', '-'.repeat(50));
  console.log('Search:', search);
  console.log('Filter:', category);
  console.log('Vendedor ID:', vendedorId);
  console.log('-'.repeat(50), ' End Query Parameters', '-'.repeat(50));

  const validCategories = [
    'comida',
    'ropa',
    'tecnologia',
    'accesorios',
    'otros',
  ];

  productoRepository
    .createQueryBuilder('producto')
    .where(
      '(producto.nombre ILIKE :search OR producto.descripcion ILIKE :search) AND (producto.vendedorId = :vendedorId OR :vendedorId IS NULL) AND (producto.categoria = :category OR :category IS NULL)',
    )
    .setParameters({
      search: `%${search || ''}%`,
      vendedorId: vendedorId ? parseInt(vendedorId as string, 10) : null,
      category:
        category && validCategories.includes(category as string)
          ? (category as string)
          : null,
    })
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



export async function editarProducto(req: Request, res: Response) {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    disponibilidad,
    precio,
    vendedorId,
    whatsapp,
    categoria,
    favorito,
  } = req.body;

  const imagen = req.file?.filename;

  try {
    const productoRepository = AppDataSource.getRepository(Producto);
    const producto = await productoRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['vendedor'],
    });

    if (!producto) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;  // Termina función sin retornar res directamente
    }

    if (nombre !== undefined) producto.nombre = nombre;
    if (descripcion !== undefined) producto.descripcion = descripcion;
    if (disponibilidad !== undefined) producto.disponibilidad = disponibilidad;
    if (precio !== undefined) producto.precio = Number(precio);
    if (whatsapp !== undefined) producto.whatsapp = whatsapp;
    if (categoria !== undefined) producto.categoria = categoria;
    if (vendedorId !== undefined) producto.vendedor = { id: vendedorId } as any;
    if (imagen) producto.imagen = imagen;

    await productoRepository.save(producto);

    res.status(200).json({ message: "Producto actualizado exitosamente" });
    return;  // Termina función sin retornar res directamente
  } catch (error) {
    console.error("Error actualizando producto:", error);
    res.status(500).json({ message: "Error al actualizar producto" });
    return;  // Termina función sin retornar res directamente
  }
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

export function obtenerMisProductos(req: Request, res: Response) {
  const { vendedorId } = req.params;
  const productoRepository = AppDataSource.getRepository('producto');

  productoRepository
    .find({ where: { vendedor: { id: parseInt(vendedorId) } } })
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
