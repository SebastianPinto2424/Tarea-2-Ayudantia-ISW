


"use strict";
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getPublicProfile,
  getPrivateProfile,
  editPrivateProfile,
  deletePrivateProfile,
} from "../controllers/profile.controller.js";

const router = Router();


router.get("/public", getPublicProfile);

router.get("/private", authMiddleware, getPrivateProfile);
router.patch("/private", authMiddleware, editPrivateProfile);
router.delete("/private", authMiddleware, deletePrivateProfile);

export default router;
