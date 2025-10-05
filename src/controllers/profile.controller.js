

"use strict";
import { AppDataSource } from "../config/configDb.js";
import User from "../entities/user.entity.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { getUserFromToken } from "../middleware/auth.middleware.js";
import { updateOwnProfile, deleteOwnAccount } from "../services/user.service.js";
import { usuarioUpdateValidation } from "../validations/user.validation.js";

export function getPublicProfile(_req, res) {
  return handleSuccess(res, 200, "Perfil público", {
    message: "Este es un perfil público. Cualquiera puede verlo.",
  });
}

export async function getPrivateProfile(req, res) {
  try {
    const userId = req.user?.id ?? req.user?.sub;
    if (!userId) return handleErrorClient(res, 401, "No autenticado");

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: userId } });
    if (!user) return handleErrorClient(res, 404, "Usuario no encontrado");

    return handleSuccess(res, 200, "Perfil privado", { id: user.id, email: user.email });
  } catch (error) {
    return handleErrorServer(res, 500, "Error obteniendo perfil", error.message);
  }
}

/*
export async function editPrivateProfile(req, res) {
  const me = getUserFromToken(req, res);
  if (!me?.id) return;

  const { error } = usuarioUpdateValidation.validate(req.body);
  if (error) {
    return handleErrorClient(
      res,
      400,
      "Datos inválidos",
      error.details.map((d) => d.message).join(", ")
    );
  }

  const { email, password } = req.body || {};
  if (email === undefined && password === undefined) {
    return handleErrorClient(res, 400, "Debes enviar email y/o password");
  }

  try {
    const updated = await updateOwnProfile(me.id, { email, password });
    return handleSuccess(res, 200, "Perfil actualizado con éxito", { id: updated.id, email: updated.email });
  } catch (err) {
    const msg = String(err?.message || "");
    const code = /en uso|registrado/i.test(msg) ? 409 : (/no encontrado/i.test(msg) ? 404 : 400);
    return handleErrorClient(res, code, msg || "Error al actualizar perfil");
  }
}*/

export async function editPrivateProfile(req, res) {
  const me = getUserFromToken(req, res);
  if (!me?.id) return;

  const { error } = usuarioUpdateValidation.validate(req.body);
  if (error) {
    return handleErrorClient(
      res,
      400,
      "Datos inválidos",
      error.details.map((d) => d.message).join(", ")
    );
  }

  const { email, password } = req.body || {};
  if (email === undefined && password === undefined) {
    return handleErrorClient(res, 400, "Debes enviar email y/o password");
  }

  try {
    const updated = await updateOwnProfile(me.id, { email, password });

    return handleSuccess(res, 200, "Perfil actualizado con éxito", {
      id: updated.id,
      email: updated.email
    });
  } catch (err) {
    const msg = String(err?.message || "");
    const code = /en uso|registrado/i.test(msg)
      ? 409
      : /no encontrado/i.test(msg)
      ? 404
      : 400;
    return handleErrorClient(res, code, msg || "Error al actualizar perfil");
  }
}

export async function deletePrivateProfile(req, res) {
  const me = getUserFromToken(req, res);
  if (!me?.id) return;

  try {
    await deleteOwnAccount(me.id);
    return handleSuccess(res, 200, "Cuenta eliminada correctamente", { id: me.id });
  } catch (err) {
    const msg = String(err?.message || "");
    const code = /no encontrado/i.test(msg) ? 404 : 400;
    return handleErrorClient(res, code, msg || "Error al eliminar cuenta");
  }
}
