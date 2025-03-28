import { Router } from "express";
const router = Router();

import { MemoryController } from "../contollers/index";

// /api/memories
// GET
router.get("/all");
router.get("/:id");

// PUT
router.put("/:id");

// POST
router.post("/");

// DELETE
router.delete("/:id");

export default router;
