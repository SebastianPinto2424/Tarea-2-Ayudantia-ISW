"use strict";
import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware.js";
import {
  listVehiculos,
  getVehiculo,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "../controllers/vehiculo.controller.js";

const router = Router();

router.get("/", listVehiculos);
router.get("/:id", getVehiculo);
router.post("/", authRequired, createVehiculo);
router.patch("/:id", authRequired, updateVehiculo);
router.delete("/:id", authRequired, deleteVehiculo);

export default router;
