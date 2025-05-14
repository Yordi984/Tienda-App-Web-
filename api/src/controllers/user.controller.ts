import { Request, Response } from "express";

export function saludar(req: Request, res: Response): void {
  res.send("Gomitas");
}
