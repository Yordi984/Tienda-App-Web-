import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../db';
import { Comprador, Vendedor } from '../entities';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret'; // Replace with your actual secret or ensure env variable is set

export function crearComprador(req: Request, res: Response) {
  const { nombre, telefono, correo, password } = req.body;

  const compradorRepository = AppDataSource.getRepository('comprador');
  const newComprador = compradorRepository.create({
    nombre,
    telefono,
    correo,
    password,
  });
  compradorRepository
    .save(newComprador)
    .then(() => {
      res.status(201).json({ message: 'Comprador created successfully' });
    })
    .catch((error) => {
      console.error('Error creating comprador:', error);
      res.status(500).json({ message: 'Error creating comprador' });
    });
}



import bcrypt from 'bcrypt'; // asegúrate de importar esto

export async function iniciarSesion(req: Request, res: Response): Promise<void> {
  const { correo, password } = req.body;

  if (!correo || !password) {
    res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    return;
  }

  try {
    const compradorRepo = AppDataSource.getRepository(Comprador);
    const comprador = await compradorRepo.findOne({ where: { correo } });

    if (comprador) {
      const match = await bcrypt.compare(password, comprador.password);
      if (!match) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
      }

      const payload = {
        id: comprador.id,
        nombre: comprador.nombre,
        tipo: 'comprador',
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        usuario: payload,
      });
      return;
    }

    const vendedorRepo = AppDataSource.getRepository(Vendedor);
    const vendedor = await vendedorRepo.findOne({ where: { correo } });

    if (vendedor) {
      const match = await bcrypt.compare(password, vendedor.password);
      if (!match) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
      }

      const payload = {
        id: vendedor.id,
        nombre: vendedor.nombre,
        tipo: 'vendedor',
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        usuario: payload,
      });
      return;
    }

    res.status(401).json({ message: 'Credenciales inválidas' });

  } catch (error) {
    console.error('Error durante el login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}
