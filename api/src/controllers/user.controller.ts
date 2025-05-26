import { Request, Response } from "express";
import { AppDataSource } from "../db";

export function CrearComprador(req: Request, res: Response) {
  const { nombre, telefono, correo, password } = req.body;

  const compradorRepository = AppDataSource.getRepository("comprador");
  const newComprador = compradorRepository.create({
    nombre,
    telefono,
    correo,
    password,
  });
  compradorRepository
    .save(newComprador)
    .then(() => {
      res.status(201).json({ message: "Comprador created successfully" });
    })
    .catch((error) => {
      console.error("Error creating comprador:", error);
      res.status(500).json({ message: "Error creating comprador" });
    });
}
