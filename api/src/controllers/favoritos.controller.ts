import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Vendedor } from '../entities/vendedor.entity';
import { Producto } from '../entities/producto.entity';

export async function marcarFavorito(req: Request, res: Response) {
  const { vendedorId, productoId } = req.body;

  try {
    const vendedorRepo = AppDataSource.getRepository(Vendedor);
    const productoRepo = AppDataSource.getRepository(Producto);

    const vendedor = await vendedorRepo.findOne({
      where: { id: vendedorId },
      relations: ['favoritos'],
    });

    const producto = await productoRepo.findOneBy({ id: productoId });

    if (!vendedor || !producto) {
      return res.status(404).json({ message: 'Vendedor o producto no encontrado' });
    }

    // Evitar duplicados
    const yaEsFavorito = vendedor.favoritos.some((p) => p.id === productoId);
    if (yaEsFavorito) {
      return res.status(400).json({ message: 'El producto ya está en favoritos' });
    }

    vendedor.favoritos.push(producto);
    await vendedorRepo.save(vendedor);

    res.status(200).json({ message: 'Producto marcado como favorito' });
  } catch (error) {
    console.error('Error al marcar favorito:', error);
    res.status(500).json({ message: 'Error al marcar favorito' });
  }
}

export async function obtenerFavoritos(req: Request, res: Response) {
  const vendedorId = parseInt(req.params.vendedorId, 10);

  try {
    const vendedorRepo = AppDataSource.getRepository(Vendedor);

    const vendedor = await vendedorRepo.findOne({
      where: { id: vendedorId },
      relations: ['favoritos'],
    });

    if (!vendedor) {
      return res.status(404).json({ message: 'Vendedor no encontrado' });
    }

    const productos = vendedor.favoritos.map((producto) => {
      if (producto.imagen) {
        producto.imagen = `${process.env.API_URL}uploads/${producto.imagen.replace(/^\/+/, '')}`;
      }
      return producto;
    });

    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ message: 'Error al obtener favoritos' });
  }
}
