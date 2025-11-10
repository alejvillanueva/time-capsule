import { Router } from "express";
const router = Router();

import memoryRoutes from "./memoryRoutes.js";
import capsuleRoutes from "./capsuleRoutes.js";

router.use("/memories", memoryRoutes);
router.use("/capsules", capsuleRoutes);

export default router;
