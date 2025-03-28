import { Router } from "express";
const router = Router();

import memoryRoutes from "./memoryRoutes";
import capsuleRoutes from "./capsuleRoutes";

router.use("/memories", memoryRoutes);
router.use("/capsules", capsuleRoutes);

export default router;
