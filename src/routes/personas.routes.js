// routes/personas.routes.js
import { Router } from "express";
import { aplicarTrabajo, getPersona, getSolEmpleo, loginPersona, savePersona } from "../controllers/personas.controller";

const router = Router();

router.post('/personas/save', savePersona)

router.post('/personas/login', loginPersona)

router.get('/personas/get', getPersona)

router.get('/personas/getSolEmplo', getSolEmpleo)

router.post('/personas/apliTrabajo', aplicarTrabajo)

export default router