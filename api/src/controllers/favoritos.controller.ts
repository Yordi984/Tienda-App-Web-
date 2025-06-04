import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Producto } from "../entities/producto.entity";
import { Vendedor } from "../entities/vendedor.entity";

export async function Favorito(req: Request, res: Response): Promise<void> {
  const productoId = Number(req.params.productoId);

  // Aquí debes obtener el vendedorId del usuario autenticado.
  // Si no tienes autenticación, puedes recibirlo por body o params temporalmente:
  // const vendedorId = Number(req.body.vendedorId);
  // Pero lo ideal es: const vendedorId = (req.user as { id: number })?.id;
  const vendedorId = Number(req.body.vendedorId);

  if (!vendedorId) {
    res.status(401).json({ message: "No autenticado" });
    return;
  }

  try {
    const vendedorRepo = AppDataSource.getRepository(Vendedor);
    const productoRepo = AppDataSource.getRepository(Producto);

    const vendedor = await vendedorRepo.findOne({
      where: { id: vendedorId },
      relations: ["favoritos"],
    });

    const producto = await productoRepo.findOneBy({ id: productoId });

    if (!vendedor || !producto) {
      res.status(404).json({ message: "Producto o vendedor no encontrado" });
      return;
    }

    const yaEsFavorito = vendedor.favoritos.some((p) => p.id === producto.id);

    if (yaEsFavorito) {
      vendedor.favoritos = vendedor.favoritos.filter((p) => p.id !== producto.id);
    } else {
      vendedor.favoritos.push(producto);
    }

    await vendedorRepo.save(vendedor);

    res.status(200).json({
      message: yaEsFavorito
        ? "Producto eliminado de favoritos"
        : "Producto agregado a favoritos",
      favorito: !yaEsFavorito,
    });
  } catch (error) {
    console.error("Error al modificar favoritos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}