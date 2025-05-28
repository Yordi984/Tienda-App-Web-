import { Request, Response } from "express";
import { AppDataSource } from "../db";

export function CrearProducto(req: Request, res: Response) {
  const { nombre, descripcion, precio, vendedorId } = req.body;
  const productoRepository = AppDataSource.getRepository("producto");
  const newProducto = productoRepository.create({
    nombre,
    descripcion,
    precio,
    vendedor: { id: vendedorId }, // Assuming vendedorId is provided in the request body
  });
  productoRepository
    .save(newProducto)
    .then(() => {
      res.status(201).json({ message: "Producto created successfully" });
    })
    .catch((error) => {
      console.error("Error creating producto:", error);
      res.status(500).json({ message: "Error creating producto" });
    });
}

export function obtenerProductos(req: Request, res: Response) {
  const productoRepository = AppDataSource.getRepository("producto");
  productoRepository
    .find({ relations: ["vendedor", "opciones", "compras"] })
    .then((productos) => {
      res.status(200).json(productos);
    })
    .catch((error) => {
      console.error("Error fetching productos:", error);
      res.status(500).json({ message: "Error fetching productos" });
    });
}

export function eliminarProducto(req: Request, res: Response) {
  const { id } = req.params;
  const productoRepository = AppDataSource.getRepository("producto");
  productoRepository
    .delete(id)
    .then(() => {
      res.status(200).json({ message: "Producto deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting producto:", error);
      res.status(500).json({ message: "Error deleting producto" });
    });
}

export function editarProducto(req: Request, res: Response) {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  const productoRepository = AppDataSource.getRepository("producto");

  productoRepository
    .findOneBy({ id: parseInt(id) })
    .then((producto) => {
      if (!producto) {
        return res.status(404).json({ message: "Producto not found" });
      }
      producto.nombre = nombre;
      producto.descripcion = descripcion;
      producto.precio = precio;

      return productoRepository.save(producto);
    })
    .then(() => {
      res.status(200).json({ message: "Producto updated successfully" });
    })
    .catch((error) => {
      console.error("Error updating producto:", error);
      res.status(500).json({ message: "Error updating producto" });
    });
}
