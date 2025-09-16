

"use strict";
import jwt from "jsonwebtoken";
import { handleErrorClient } from "../Handlers/responseHandlers.js";
import { JWT_SECRET } from "../config/configEnv.js";


export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || "";
  const headerToken = auth.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  const cookieToken = req.cookies?.jwt ?? null;
  const token = headerToken || cookieToken;

  if (!token) {
    return handleErrorClient(res, 401, "Acceso denegado. No se proporcionó token.");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET || process.env.JWT_SECRET);
    
    req.user = payload;
    return next();
  } catch (error) {
    return handleErrorClient(res, 401, "Token inválido o expirado.", error.message);
  }
}


export function getUserFromToken(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) return handleErrorClient(res, 401, "Token no proporcionado.");

  try {
    const payload = jwt.verify(token, JWT_SECRET || process.env.JWT_SECRET);
    const id = payload.sub ?? payload.id;
    const email = payload.email;
    if (!id || !email) return handleErrorClient(res, 500, "Token/Payload inválido.");
    return { id, email };
  } catch (error) {
    return handleErrorClient(res, 401, "Token inválido o expirado.", error.message);
  }
}

export function getToken(req) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return undefined;
  const token = authHeader.split(" ")[1];
  return token || undefined;
}

export const authRequired = authMiddleware;
