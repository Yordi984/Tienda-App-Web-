import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../db';
import {Vendedor } from '../entities';

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


export async function obtenerInfoDeUsuario(req: Request, res: Response): Promise<void> {
  try {
    // 1) Leer el header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No autorizado. Token no proporcionado" });
      return;
    }

    // 2) Extraer el token
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No autorizado. Token mal formado" });
      return;
    }

    // 3) Verificar y decodificar el token
    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      res.status(401).json({ message: "Token inválido o expirado" });
      return;
    }

    // 4) Obtener el userId desde el payload
    const userId = payload.id;
    if (!userId) {
      res.status(401).json({ message: "Token inválido. No contiene id de usuario" });
      return;
    }

    // 5) Buscar en la BD al vendedor con ese ID
    const repo = AppDataSource.getRepository(Vendedor);
    const vendedor = await repo.findOneBy({ id: userId });

    if (!vendedor) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // 6) Responder con los campos que necesita el frontend
    res.status(200).json({
      id: vendedor.id,
      name: vendedor.nombre,
      email: vendedor.correo,
      phone: vendedor.telefono,
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}

export async function editarUsuario(req: Request, res: Response): Promise<void> {
  const { nombre, telefono, correo, password } = req.body;

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No autorizado. Token no proporcionado" });
      return;
    }

    const token = authHeader.split(" ")[1];

    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      res.status(401).json({ message: "Token inválido o expirado" });
      return;
    }

    const userId = payload.id;
    if (!userId) {
      res.status(401).json({ message: "Token inválido: no contiene id de usuario" });
      return;
    }

    const repo = AppDataSource.getRepository(Vendedor);
    const usuario = await repo.findOne({ where: { id: userId } });

    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // Actualiza solo si llegan los campos
    if (nombre) usuario.nombre = nombre;
    if (telefono) usuario.telefono = telefono;
    if (correo) usuario.correo = correo;
    if (password) usuario.password = await bcrypt.hash(password, 10);

    await repo.save(usuario);

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}

// --- ELIMINAR USUARIO ---
export async function eliminarUsuario(req: Request, res: Response): Promise<void> {
  if (!req.user || typeof req.user !== 'object' || !('id' in req.user)) {
    res.status(401).json({ message: 'No autorizado. Token inválido o no proporcionado' });
    return;
  }
  const { id } = req.user as { id: number };

  try {
    const repo = AppDataSource.getRepository(Vendedor);
    const usuario = await repo.findOne({ where: { id } });

    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    await repo.remove(usuario);

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}