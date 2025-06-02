import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../db';
import { Vendedor } from '../entities';

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

