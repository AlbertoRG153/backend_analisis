import { Router } from "express";
import { savePuestoTrabajo, saveTipoContrato, saveContrato, getContratoById, saveRequisito,
     saveTipoRequisito, getPuestos, getSolicitudById } from '../controllers/puestos_trabajo.controller'

const router = Router()

router.post('/puesto/save', savePuestoTrabajo)

router.post('/tipoContrato/save', saveTipoContrato)

router.post('/contrato/save', saveContrato)

router.post('/requisito/save', saveRequisito)

router.post('/tipoRequisito/save', saveTipoRequisito)

router.get('/contrato/get/:id_puesto/:id_tipo_contrato', getContratoById)

router.get('/puestos/get', getPuestos)

router.get('/solicitudes/:id', getSolicitudById);

export default router