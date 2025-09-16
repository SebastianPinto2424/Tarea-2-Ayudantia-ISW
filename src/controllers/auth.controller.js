
"use strict";
import { loginService, registerService } from "../services/auth.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../Handlers/responseHandlers.js";

export async function login(req, res) {
  try {
    const { body } = req;

    const [result, errorLogin] = await loginService(body);
    if (errorLogin) {
      return handleErrorClient(res, 401, "Error de autenticación", errorLogin);
    }

    const { user, accessToken } = result;

    
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    return handleSuccess(res, 200, "Inicio de sesión exitoso", {
      user,
      accessToken,
    });
  } catch (error) {
    return handleErrorServer(
      res,
      500,
      "Error interno del servidor",
      error?.message || error
    );
  }
}

export async function register(req, res) {
  try {
    const { body } = req;
    const [result, errorRegister] = await registerService(body);
    if (errorRegister) {
      return handleErrorClient(res, 400, "No se pudo registrar", errorRegister);
    }
    if (result?.password) delete result.password;

    return handleSuccess(res, 201, "Usuario registrado", result);
  } catch (error) {
    return handleErrorServer(
      res,
      500,
      "Error interno del servidor",
      error?.message || error
    );
  }
}
