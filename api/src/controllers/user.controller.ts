import { Request, response, Response } from "express";
import { AppDataSource } from "../db";
import { comprador } from "../entities/comprador";
import jwt from "jsonwebtoken";

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

const JWT_SECRET = "mi_clave_secreta";

export async function iniciarSesion(
  req: Request,
  res: Response
): Promise<void> {
  const { correo, password } = req.body;

  // Validar que se recibieron los datos
  if (!correo || !password) {
    res.status(400).json({ message: "Correo y contraseña son requeridos" });
    return;
  }

  const compradorRepository = AppDataSource.getRepository(comprador);

  try {
    const usuario = await compradorRepository.findOne({
      where: { correo, password },
    });

    if (!usuario) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      comprador: payload,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}
