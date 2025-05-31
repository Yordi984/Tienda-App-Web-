import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../db';
import { Vendedor } from '../entities/vendedor.entity';

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

const JWT_SECRET = 'mi_clave_secreta';

export async function iniciarSesionVendedor(
  req: Request,
  res: Response,
): Promise<void> {
  const { correo, password } = req.body;

  if (!correo || !password) {
    res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    return;
  }

  const repositorio = AppDataSource.getRepository(Vendedor); // Usa la entidad, no el string

  try {
    const usuario = await repositorio.findOne({ where: { correo, password } });

    if (!usuario) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      vendedor: payload,
    });
  } catch (error) {
    console.error('Error durante el login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}
