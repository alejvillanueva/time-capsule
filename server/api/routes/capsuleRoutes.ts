import { Router } from "express";
const router = Router();

import { CapsuleController } from "../contollers/index";

// GET
router.get("/all", CapsuleController.getAllCapsules);
router.get("/:id", CapsuleController.getSingleCapsule);

// POST
router.post("/", CapsuleController.createCapsule);

// PUT
router.put("/:id", CapsuleController.updateCapsule);

// DELETE
router.delete("/:id", CapsuleController.deleteCapsule);

export default router;
