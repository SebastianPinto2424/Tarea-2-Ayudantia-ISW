"use strict";
import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware.js";
import {
  listPilotos,
  getPiloto,
  createPiloto,
  updatePiloto,
  deletePiloto,
} from "../controllers/piloto.controller.js";

const router = Router();

router.get("/", listPilotos);
router.get("/:id", getPiloto);
router.post("/", authRequired, createPiloto);
router.patch("/:id", authRequired, updatePiloto);
router.delete("/:id", authRequired, deletePiloto);

export default router;
