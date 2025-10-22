"use strict";
import { AppDataSource } from "../config/configDb.js";
import Vehiculo from "../entities/vehiculo.entity.js";
import {
  handleSuccess,
  handleErrorClient,
  handleErrorServer,
} from "../Handlers/responseHandlers.js";

const repo = () => AppDataSource.getRepository(Vehiculo);

export async function listVehiculos(_req, res) {
  const data = await repo().find({ relations: ["piloto"] });
  return handleSuccess(res, 200, "Listado de vehículos", data);
}

export async function getVehiculo(req, res) {
  try {
    const id = Number(req.params.id);
    const v = await repo().findOne({ where: { id }, relations: ["piloto"] });
    if (!v) return handleErrorClient(res, 404, "Vehículo no encontrado");
    return handleSuccess(res, 200, "Vehículo", v);
  } catch (e) {
    return handleErrorServer(res, 500, "Error obteniendo vehículo", e.message);
  }
}

export async function createVehiculo(req, res) {
  try {
    const nuevo = repo().create(req.body); // { marca, modelo, anio, patente, pilotoId? }
    const saved = await repo().save(nuevo);
    return handleSuccess(res, 201, "Vehículo creado", saved);
  } catch (e) {
    return handleErrorServer(res, 500, "Error creando vehículo", e.message);
  }
}

export async function updateVehiculo(req, res) {
  try {
    const id = Number(req.params.id);
    const v = await repo().findOne({ where: { id } });
    if (!v) return handleErrorClient(res, 404, "Vehículo no encontrado");

    repo().merge(v, req.body);
    const saved = await repo().save(v);
    return handleSuccess(res, 200, "Vehículo actualizado", saved);
  } catch (e) {
    return handleErrorServer(res, 500, "Error actualizando vehículo", e.message);
  }
}

export async function deleteVehiculo(req, res) {
  try {
    const id = Number(req.params.id);
    const v = await repo().findOne({ where: { id } });
    if (!v) return handleErrorClient(res, 404, "Vehículo no encontrado");

    await repo().remove(v);
    return handleSuccess(res, 200, "Vehículo eliminado", { id });
  } catch (e) {
    return handleErrorServer(res, 500, "Error eliminando vehículo", e.message);
  }
}
