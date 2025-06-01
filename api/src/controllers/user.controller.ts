import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../db';
import { Comprador, Vendedor } from '../entities';

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



const JWT_SECRET = 'mi_clave_secreta';

export async function iniciarSesion(req: Request, res: Response): Promise<void> {
  const { correo, password } = req.body;

  if (!correo || !password) {
    res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    return;
  }

  try {
    // Buscar primero en compradores
    const compradorRepo = AppDataSource.getRepository(Comprador);
    const comprador = await compradorRepo.findOne({ where: { correo, password } });

    if (comprador) {
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

    // Si no está en compradores, buscar en vendedores
    const vendedorRepo = AppDataSource.getRepository(Vendedor);
    const vendedor = await vendedorRepo.findOne({ where: { correo, password } });

    if (vendedor) {
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

    // Si no se encontró en ninguno
    res.status(401).json({ message: 'Credenciales inválidas' });

  } catch (error) {
    console.error('Error durante el login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}
