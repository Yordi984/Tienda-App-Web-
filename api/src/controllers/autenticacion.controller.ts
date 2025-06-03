import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db";

import { Vendedor } from "../entities/vendedor.entity";
import { enviarCorreoRecuperacion } from "../utils/correo"; // función que crearemos abajo

const JWT_SECRET = process.env.JWT_SECRET || "claveSecreta";


export const registrarVendedor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombre, correo, telefono, password } = req.body;
    const repo = AppDataSource.getRepository(Vendedor);

    const existente = await repo.findOneBy({ correo });
    if (existente) {
      res.status(400).json({ msg: "Correo ya registrado" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const nuevo = repo.create({ nombre, correo, telefono, password: hashed });
    await repo.save(nuevo);

    res.status(201).json({ msg: "Vendedor registrado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar vendedor", error });
  }
};

export const solicitarRecuperacion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { correo } = req.body;

  // Solo repositorio de Vendedor
  const repoVendedor = AppDataSource.getRepository(Vendedor);

  const vendedor = await repoVendedor.findOneBy({ correo });

  if (!vendedor) {
    res.status(404).json({ msg: "Correo no registrado" });
    return;
  }

  // Generar token solo para vendedor
  const token = jwt.sign({ correo, tipo: "vendedor" }, JWT_SECRET, { expiresIn: "15m" });

  // Enviar correo
  await enviarCorreoRecuperacion(correo, token);

  res.json({ msg: "Correo de recuperación enviado" });
};


export const restablecerPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.params;
  const { nuevaPassword } = req.body;

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    const repo = AppDataSource.getRepository(Vendedor);

    const usuario = await repo.findOneBy({ correo: payload.correo });
    if (!usuario) {
      res.status(404).json({ msg: "Usuario no encontrado" });
      return;
    }

    const hashed = await bcrypt.hash(nuevaPassword, 10);
    usuario.password = hashed;
    await repo.save(usuario);

    res.json({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "Token inválido o expirado" });
  }
};
