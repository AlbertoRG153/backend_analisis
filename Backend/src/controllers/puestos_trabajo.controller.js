import { getConnection, sql, queries } from '../database'

export const savePuestoTrabajo = async (req, res) => {

    try {
        const { tipo_puesto, condiciones, id_empresa } = req.body

        if (!tipo_puesto || !condiciones || !id_empresa) {
            return res.status(400).json({ msg: 'Bad Request.  Por favor llena todos los campos' })
        }

        const pool = await getConnection();

        await pool.request()
            .input('tipo_puesto', sql.VarChar, tipo_puesto)
            .input('condiciones', sql.VarChar, condiciones)
            .input('id_empresa', sql.Int, id_empresa)
            .query(queries.savePuesto);

        res.json({
            tipo_puesto, condiciones, id_empresa
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const saveTipoContrato = async (req, res) => {

    try {
        const { tipo_contrato, salario_por_hora, horas_contrato } = req.body

        if (!tipo_contrato || !salario_por_hora || !horas_contrato) {
            return res.status(400).json({ msg: 'Bad Request.  Por favor llena todos los campos' })
        }

        const pool = await getConnection();

        await pool.request()
            .input('tipo_contrato', sql.VarChar, tipo_contrato)
            .input('salario_por_hora', sql.Float, salario_por_hora)
            .input('horas_contrato', sql.Int, horas_contrato)
            .query(queries.saveTipoContrato);

        res.json({
            tipo_contrato, salario_por_hora, horas_contrato
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const saveContrato = async (req, res) => {

    try {
        const { id_puesto, id_tipo_contrato } = req.body

        if (!id_puesto || !id_tipo_contrato) {
            return res.status(400).json({ msg: 'Bad Request.  Por favor llena todos los campos' })
        }

        const pool = await getConnection();

        await pool.request()
            .input('id_puesto', sql.Int, id_puesto)
            .input('id_tipo_contrato', sql.Int, id_tipo_contrato)
            .query(queries.saveContrato);

        res.json({
            id_puesto, id_tipo_contrato
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const saveRequisito = async (req, res) => {

    try {
        const { id_requisito, requisito } = req.body

        if (!id_requisito || !requisito) {
            return res.status(400).json({ msg: 'Bad Request.  Por favor llena todos los campos' })
        }

        const pool = await getConnection();

        await pool.request()
            .input('id_requisito', sql.Int, id_requisito)
            .input('requisito', sql.VarChar, requisito)
            .query(queries.saveRequisito);

        res.json({
            id_requisito, requisito
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const saveTipoRequisito = async (req, res) => {

    try {
        const { id_tipo_requisito, id_requisito, id_puesto, tipo } = req.body

        if (!id_tipo_requisito || !id_requisito || !id_puesto || !tipo) {
            return res.status(400).json({ msg: 'Bad Request.  Por favor llena todos los campos' })
        }

        const pool = await getConnection();

        await pool.request()
            .input('id_tipo_requisito', sql.Int, id_tipo_requisito)
            .input('id_requisito', sql.Int, id_requisito)
            .input('id_puesto', sql.Int, id_puesto)
            .input('tipo', sql.VarChar, tipo)
            .query(queries.saveTipoRequisito);

        res.json({
            id_tipo_requisito, id_requisito, id_puesto, tipo
        });


    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getContratoById = async (req, res) => {

    const { id_puesto, id_tipo_contrato } = req.params

    const pool = await getConnection()

    const result = await pool.request()
        .input('id_puesto', sql.Int, id_puesto)
        .input('id_tipo_contrato', sql.Int, id_tipo_contrato)
        .query(queries.getContratoById)

    res.json(result.recordset[0])
};

export const getPuestos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query(queries.getPuestos);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los puestos', error: error.message });
    }
};
export const getSolicitudById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT st.ID_Solicitudes_Tipos, st.ID_Puesto, st.ID_Solicitante, st.Contratado, pt.Tipo_Puesto,
                       tc.TipoContrato, tc.SueldoBase as Sueldo,
                       pe.Nombre + ' ' + pe.Apellido as Nombre, es.Especialidad
                FROM Solicitudes_Tipos st
                INNER JOIN Puestos_Trabajo pt ON st.ID_Puesto = pt.ID_Puesto
                INNER JOIN Personas pe ON st.ID_Solicitante = pe.ID_Persona
                INNER JOIN Estudios es ON st.ID_Solicitante = es.Solicitantes_ID_Persona
                INNER JOIN Contratos co ON pt.ID_Puesto = co.ID_Puesto
                INNER JOIN Tipo_Contratos tc ON co.IdTipoContrato = tc.IdTipoContrato
                WHERE st.ID_Solicitudes_Tipos = @id
            `);
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Error al obtener la solicitud:', err);
        res.status(500).send('Error al obtener la solicitud');
    }
};

export const savePuestoCompleto = async (req, res) => {
    const { tipo_puesto, condiciones, id_empresa, tipo_contrato, salario_por_hora, horas_contrato, idrequisito, tipo } = req.body;

    if (!tipo_puesto || !condiciones || !id_empresa || !tipo_contrato || !salario_por_hora || !horas_contrato || !idrequisito || !tipo) {
        return res.status(400).json({ msg: 'Bad Request. Por favor llena todos los campos' });
    }

    let transaction;

    try {
        const pool = await getConnection();
        transaction = new sql.Transaction(pool);

        await transaction.begin();

        // Guardar Puesto
        const puestoResult = await transaction.request()
            .input('tipo_puesto', sql.VarChar, tipo_puesto)
            .input('condiciones', sql.VarChar, condiciones)
            .input('id_empresa', sql.Int, id_empresa)
            .query(queries.savePuesto1);
        const id_puesto = puestoResult.recordset[0].ID_Puesto;

        // Guardar Tipo de Contrato
        const tipoContratoResult = await transaction.request()
            .input('tipo_contrato', sql.VarChar, tipo_contrato)
            .input('salario_por_hora', sql.Float, salario_por_hora)
            .input('horas_contrato', sql.Int, horas_contrato)
            .query(queries.saveTipoContrato1);
        const id_tipo_contrato = tipoContratoResult.recordset[0].IdTipoContrato;

        // Guardar Contrato
        await transaction.request()
            .input('id_puesto', sql.Int, id_puesto)
            .input('id_tipo_contrato', sql.Int, id_tipo_contrato)
            .query(queries.saveContrato1);

        // Guardar Tipo de Requisito
        await transaction.request()
            .input('id_tipo_requisito', sql.Int, id_puesto) // Usar id_puesto como id_tipo_requisito
            .input('id_requisito', sql.Int, idrequisito)
            .input('id_puesto', sql.Int, id_puesto)
            .input('tipo', sql.VarChar, tipo)
            .query(queries.saveTipoRequisito1);

        // Obtener los detalles del puesto guardado
        const puestoDetails = await transaction.request()
            .input('id_puesto', sql.Int, id_puesto)
            .query(queries.getPuestoDetails);

        await transaction.commit();

        res.json(puestoDetails.recordset);
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error al guardar el puesto completo:', error);
        res.status(500).json({ message: 'Error al guardar el puesto completo', error });
    }
};