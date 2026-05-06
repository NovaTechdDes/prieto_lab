import { Router } from "express";
import { getSaldos } from "../controllers/saldo.controller";

const router = Router();

router.get("/", getSaldos);

export default router;
