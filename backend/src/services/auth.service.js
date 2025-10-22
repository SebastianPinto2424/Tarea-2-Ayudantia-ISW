
"use strict";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/configEnv.js";
import { findUserByEmail, createUser } from "./user.service.js";

export async function loginService({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) return [null, "Credenciales incorrectas"];
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return [null, "Credenciales incorrectas"];


  const payload = { sub: user.id, email: user.email }; 
  

  const accessToken = jwt.sign(payload, JWT_SECRET || process.env.JWT_SECRET, { expiresIn: "1d" });
  return [{ user: { id: user.id, email: user.email }, accessToken }, null];
}


export async function registerService({ nombre, apellido, email, password, rol }) {
  try {
    const user = await createUser({ nombre, apellido, email, password, rol });
    return [user, null];
  } catch (err) {
    return [null, err?.message || "Error al registrar usuario"];
  }
}

