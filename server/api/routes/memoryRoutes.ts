import { Router } from "express";
const router = Router();

import { MemoryController } from "../contollers/index";

// GET
router.get("/:id", MemoryController.getMemory);

// POST
router.post("/", MemoryController.createMemory);

// PUT
router.put("/:id", MemoryController.updateMemory);

// DELETE
router.delete("/:id", MemoryController.deleteMemory);

export default router;
