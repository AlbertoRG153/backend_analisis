import { Router } from "express";
import { getEmpresas, getEmpresaById, saveEmpresa, deleteEmpresaById, updateEmpresaById, loginEmpresa,
     SaveSolicitudEmpleo, getPuestoById, getSolicitudesByEmpresa } from '../controllers/empresas.controllers'

const router = Router()

router.get('/empresas/get', getEmpresas)

router.get('/empresa/get/:id', getEmpresaById)

router.post('/empresa/login', loginEmpresa)

router.post('/empresa/save', saveEmpresa)

router.post('/empresa/solEmpleo', SaveSolicitudEmpleo)

router.put('/empresa/update/:id', updateEmpresaById)

router.delete('/empresa/delete/:id', deleteEmpresaById)

router.get('/puesto/get/:id', getPuestoById);

router.get('/solicitudes/:id_empresa', getSolicitudesByEmpresa);

export default router