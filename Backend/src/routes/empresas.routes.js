import { Router } from "express";
import {
     getEmpresas, getEmpresaById, saveEmpresa, deleteEmpresaById, updateEmpresaById, loginEmpresa,
     SaveSolicitudEmpleo, getPuestoById, getPuestosByEmpresa, contratar, getSolicitudesByEmpresa
} from '../controllers/empresas.controllers'

const router = Router()

router.get('/empresas/get', getEmpresas)

router.get('/empresa/get/:id', getEmpresaById)

router.post('/empresa/login', loginEmpresa)

router.post('/empresa/save', saveEmpresa)

router.post('/empresa/solEmpleo', SaveSolicitudEmpleo)

router.put('/empresa/update/:id', updateEmpresaById)

router.put('/empresa/contratar', contratar);

router.delete('/empresa/delete/:id', deleteEmpresaById)

router.get('/puesto/get/:id', getPuestoById);

router.get('/empresa/puestos/:id_empresa', getPuestosByEmpresa);

router.get('/empresas/solicitudes/get/:empresaID', getSolicitudesByEmpresa);


export default router