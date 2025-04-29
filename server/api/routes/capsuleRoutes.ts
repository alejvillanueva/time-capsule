import { Router } from "express";
const router = Router();

import { CapsuleController } from "../contollers/index.js";

// GET
router.get("/all", CapsuleController.getAllCapsules);
router.get("/:id", CapsuleController.getCapsule);

// POST
router.post("/", CapsuleController.createCapsule);

// PUT
router.put("/:id", CapsuleController.updateCapsule);

// DELETE
router.delete("/:id", CapsuleController.deleteCapsule);

export default router;
