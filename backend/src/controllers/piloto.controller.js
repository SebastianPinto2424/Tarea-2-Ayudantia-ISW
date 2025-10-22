"use strict";
import { AppDataSource } from "../config/configDb.js";
import Piloto from "../entities/piloto.entity.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";

const repo = () => AppDataSource.getRepository(Piloto);

export async function listPilotos(_req, res) {
  const data = await repo().find();
  return handleSuccess(res, 200, "Listado de pilotos", data);
}

export async function getPiloto(req, res) {
  try {
    const id = Number(req.params.id);
    const p = await repo().findOne({ where: { id } });
    if (!p) return handleErrorClient(res, 404, "Piloto no encontrado");
    return handleSuccess(res, 200, "Piloto", p);
  } catch (e) {
    return handleErrorServer(res, 500, "Error obteniendo piloto", e.message);
  }
}

export async function createPiloto(req, res) {
  try {
    const nuevo = repo().create(req.body);
    const saved = await repo().save(nuevo);
    return handleSuccess(res, 201, "Piloto creado", saved);
  } catch (e) {
    return handleErrorServer(res, 500, "Error creando piloto", e.message);
  }
}

export async function updatePiloto(req, res) {
  try {
    const id = Number(req.params.id);
    const p = await repo().findOne({ where: { id } });
    if (!p) return handleErrorClient(res, 404, "Piloto no encontrado");

    repo().merge(p, req.body);
    const saved = await repo().save(p);
    return handleSuccess(res, 200, "Piloto actualizado", saved);
  } catch (e) {
    return handleErrorServer(res, 500, "Error actualizando piloto", e.message);
  }
}

export async function deletePiloto(req, res) {
  try {
    const id = Number(req.params.id);
    const p = await repo().findOne({ where: { id } });
    if (!p) return handleErrorClient(res, 404, "Piloto no encontrado");

    await repo().remove(p);
    return handleSuccess(res, 200, "Piloto eliminado", { id });
  } catch (e) {
    return handleErrorServer(res, 500, "Error eliminando piloto", e.message);
  }
}
