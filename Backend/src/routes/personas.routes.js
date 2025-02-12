// routes/personas.routes.js
import { Router } from "express";
import { aplicarTrabajo, getPersona, getSolEmpleo, loginPersona, savePersona, saveRequisitoEmpleo, postularPuesto } from "../controllers/personas.controller";

const router = Router();

router.post('/personas/save', savePersona)

router.post('/personas/login', loginPersona)

router.get('/personas/get', getPersona)

router.get('/personas/getSolEmpleo', getSolEmpleo)

router.post('/personas/apliTrabajo', aplicarTrabajo)

router.post('/persona/ReqEmpleo', saveRequisitoEmpleo)

router.post('/postular', postularPuesto);

export default router
