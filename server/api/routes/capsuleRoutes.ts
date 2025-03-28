import { Router } from "express";
const router = Router();

import { CapsuleController } from "../contollers/index";

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
