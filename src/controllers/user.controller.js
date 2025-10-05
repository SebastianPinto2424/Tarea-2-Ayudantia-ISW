
"use strict";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/configDb.js";
import User from "../entities/user.entity.js";
import {
  handleSuccess,
  handleErrorClient,
  handleErrorServer,
} from "../Handlers/responseHandlers.js";
import { usuarioUpdateValidation } from "../validations/user.validation.js";


export async function updateMyProfile(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return handleErrorClient(res, 401, "No autenticado");

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
    if (!email && !password) {
      return handleErrorClient(res, 400, "Debes enviar email y/o password");
    }

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: userId } });
    if (!user) return handleErrorClient(res, 404, "Usuario no encontrado");

    if (email && email !== user.email) {
      const exists = await repo.findOne({ where: { email } });
      if (exists) return handleErrorClient(res, 409, "El email ya está en uso");
      user.email = email;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await repo.save(user);
    return handleSuccess(res, 200, "Perfil actualizado", { id: user.id, email: user.email });
  } catch (error) {
    return handleErrorServer(res, 500, "Error actualizando perfil", error.message);
  }
}

export async function deleteMyProfile(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return handleErrorClient(res, 401, "No autenticado");

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: userId } });
    if (!user) return handleErrorClient(res, 404, "Usuario no encontrado");

    await repo.remove(user);
    return handleSuccess(res, 200, "Cuenta eliminada correctamente", { id: userId });
  } catch (error) {
    return handleErrorServer(res, 500, "Error eliminando cuenta", error.message);
  }
}
