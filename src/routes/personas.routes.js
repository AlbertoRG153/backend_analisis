// routes/personas.routes.js
import { Router } from "express";
import { getPersona, loginPersona, savePersona, saveSolicitantes } from "../controllers/personas.controller";

const router = Router();

router.post('/personas/save', savePersona)

router.post('/personas/sol', saveSolicitantes)

router.get('/personas/login', loginPersona)

router.get('/personas/get', getPersona)

export default router;
