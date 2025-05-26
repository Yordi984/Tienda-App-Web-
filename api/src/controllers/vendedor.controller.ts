import { Request, Response } from "express";
import { AppDataSource } from "../db";

export function CrearVendedor(req: Request, res: Response) {
  const repositorio = AppDataSource.getRepository("vendedor");
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
      res.status(201).json({ message: "Vendedor created successfully" });
    })
    .catch((error) => {
      console.error("Error creating vendedor:", error);
      res.status(500).json({ message: "Error creating vendedor" });
    });
}

export function iniciarSesionVendedor(req: Request, res: Response) {
  const { correo, password } = req.body;
  const repositorio = AppDataSource.getRepository("vendedor");
  repositorio
    .findOne({ where: { correo, password } })
    .then((vendedor) => {
      if (vendedor) {
        res.status(200).json({ message: "Login successful", vendedor });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Error during login" });
    });
}
