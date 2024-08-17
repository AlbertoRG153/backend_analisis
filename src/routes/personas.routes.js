// routes/personas.routes.js
import { Router } from "express";
import { getPersona, getPersonas, loginPersona, savePersona } from "../controllers/personas.controller";

const router = Router();

router.get(`/personas/save`, savePersona)

router.get(`/personas/login`, loginPersona)

router.get(`/personas/get`, getPersona)

export default router;
