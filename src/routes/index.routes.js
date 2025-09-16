"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import pilotoRoutes from "./piloto.routes.js";
import vehiculoRoutes from "./vehiculo.routes.js";

export function routerApi(app) {
  const router = Router();
  app.use("/api", router);

  router.use("/auth", authRoutes);
  router.use("/profile", profileRoutes);
  
  router.use("/pilotos", pilotoRoutes);
  router.use("/vehiculos", vehiculoRoutes);

  console.log("[routerApi] montado /api (incluye /profile)");
}

