// routes/personas.routes.js
import { Router } from "express";
import { getPersona, loginPersona, savePersona } from "../controllers/personas.controller";

const router = Router();

router.post('/personas/save', savePersona)

router.get('/personas/login', loginPersona)

router.get('/personas/get', getPersona)

export default router;
