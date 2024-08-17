import { Router } from "express";
import { savePersona ,saveEstudios, saveInfoFamilia, saveInfoLegal, saveInfoSanitaria } from "../controllers/personas.controller";

const router = Router();

router.post('/perona/save', savePersona);

router.post('/persona/familia/save', saveInfoFamilia);

router.post('/persona/estudios/save', saveEstudios);

router.post('/persona/legale/save', saveInfoLegal);

router.post('/persona/sanitario/save', saveInfoSanitaria)

export default router;
