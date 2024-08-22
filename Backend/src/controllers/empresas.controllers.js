import { getConnection, sql, queries } from '../database'
import bcrypt from 'bcrypt';



export const getEmpresas = async (req, res) => {

    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllEmpresa);
        res.json(result.recordset);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getEmpresaById = async (req, res) => {

    const { id } = req.params

    const pool = await getConnection()

    const result = await pool.request()
        .input('Id', id)
        .query(queries.getEmpresaById)

    res.json(result.recordset[0])
};

export const saveEmpresa = async (req, res) => {

    try {
        const { nombre, cif, director, direccion, telefono, email, estado, password } = req.body
        if (!nombre || !cif || !director || !direccion || !telefono || !email || !estado || !password) {
            return res.status(400).json({ msg: 'Bad Request.  Por favor llena todos los campos' })
        }

        // Encriptar la contraseña
        const saltRounds = 10; // Número de rondas de encriptación
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const pool = await getConnection();

        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('cif', sql.VarChar, cif)
            .input('director', sql.VarChar, director)
            .input('direccion', sql.VarChar, direccion)
            .input('telefono', sql.VarChar, telefono)
            .input('email', sql.VarChar, email)
            .input('estado', sql.Bit, estado)
            .input('password', sql.VarChar, hashedPassword)
            .query(queries.saveEmpresa);

        res.json({
            nombre, cif, director, direccion, telefono, email, estado
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const updateEmpresaById = async (req, res) => {

    const { nombre, cif, director, direccion, telefono, email, estado, password } = req.body

    const { id } = req.params

    // Encriptar la contraseña
    const saltRounds = 10; // Número de rondas de encriptación
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!nombre || !cif || !director || !direccion || !telefono || !email || !estado) {
        return res.status(400).json({ msg: 'Bad Request.  Por favor llena todos los campos' })
    }

    const pool = await getConnection();

    await pool.request()
        .input('nombre', sql.VarChar, nombre)
        .input('cif', sql.VarChar, cif)
        .input('director', sql.VarChar, director)
        .input('direccion', sql.VarChar, direccion)
        .input('telefono', sql.VarChar, telefono)
        .input('email', sql.VarChar, email)
        .input('estado', sql.Bit, estado)
        .input('password', sql.VarChar, hashedPassword)
        .input('Id', sql.Int, id)
        .query(queries.updateEmpresaById);

    res.json({
        nombre, cif, director, direccion, telefono, email, estado
    });
};

export const deleteEmpresaById = async (req, res) => {

    const { id } = req.params

    const pool = await getConnection()

    const result = await pool.request()
        .input('Id', id)
        .query(queries.deleteEmpresaById)

    res.send(result)
};

export const loginEmpresa = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Bad Request. Por favor proporciona email y password.' });
    }

    try {
        const pool = await getConnection();

        // Buscar al usuario por email
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query(queries.getEmpresaByEmail);

        if (result.recordset.length === 0) {
            return res.status(401).json({ msg: 'Unauthorized. El email no está registrado.' });
        }

        const empresa = result.recordset[0];

        // Verifica la contraseña
        const match = await bcrypt.compare(password, empresa.Password);

        if (!match) {
            return res.status(401).json({ msg: 'Unauthorized. La contraseña es incorrecta.' });
        }

        // Login exitoso
        res.status(200).json({
            message: 'Login exitoso',
            empresa: {
                id: empresa.ID_Empresa,
                cif: empresa.CIF,
                nombre: empresa.Nombre,
                direccion: empresa.Direccion,
                email: empresa.Email
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error durante el login.' });
    }
};

export const SaveSolicitudEmpleo = async (req, res) => {
    try {
        const { tipo_puesto_solicitado, limitaciones, deseos, salario_max, salario_min, id_solicitante, id_puesto } = req.body;

        if (!tipo_puesto_solicitado || !limitaciones || !deseos || !salario_max || !salario_min || !id_solicitante || !id_puesto) {
            return res.status(400).json({ msg: 'Bad Request. Por favor completar todos los campos' });
        }

        const pool = await getConnection();

        await pool.request()
            .input('tipo_puesto_solicitado', sql.VarChar, tipo_puesto_solicitado)
            .input('limitaciones', sql.VarChar, limitaciones)
            .input('deseos', sql.VarChar, deseos)
            .input('salario_max', sql.Float, salario_max)
            .input('salario_min', sql.Float, salario_min)
            .input('id_solicitante', sql.Float, id_solicitante)
            .input('id_puesto', sql.Float, id_puesto)
            .query(queries.saveSolicitudEmpleo);

        res.json({
            tipo_puesto_solicitado, limitaciones, deseos, salario_max, salario_min, id_solicitante, id_puesto
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getPuestoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('ID_Puesto', sql.Int, id)
            .query(queries.getPuestosById);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Puesto not found' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getPuestosByEmpresa = async (req, res) => {
    try {
        const { id_empresa } = req.params;

        if (!id_empresa) {
            return res.status(400).json({ message: 'ID_Empresa es requerido' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('ID_Empresa', sql.Int, id_empresa)
            .query(queries.getPuestosByEmpresa);

        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las solicitudes getPuestosByEmpresa:', error); // Log del error
        res.status(500).json({ message: 'Error al obtener las solicitudes', error });
    }
};


//
export const contratar = async (req, res) => {
    try {
        const { ID_Solicitudes_Tipos, ID_Solicitante } = req.body;
        const pool = await getConnection();

        const updateResult = await pool.request()
            .input('ID_Solicitudes_Tipos', sql.Int, ID_Solicitudes_Tipos)
            .input('ID_Solicitante', sql.BigInt, ID_Solicitante)
            .query(queries.contratarSolicitante);

        if (updateResult.rowsAffected[0] > 0) {
            const result = await pool.request()
                .input('ID_Solicitudes_Tipos', sql.Int, ID_Solicitudes_Tipos)
                .input('ID_Solicitante', sql.BigInt, ID_Solicitante)
                .query('SELECT * FROM Solicitudes_Tipos WHERE ID_Solicitudes_Tipos = @ID_Solicitudes_Tipos AND ID_Solicitante = @ID_Solicitante');

            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Registro no encontrado o no actualizado' });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
//
export const getSolicitudesByEmpresa = async (req, res) => {
    const { empresaID } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('empresaID', sql.Int, empresaID)
            .query(queries.getSolicitudesByEmpresa);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No se encontraron solicitudes para esta empresa.' });
        }

        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener las solicitudes:', err);
        res.status(500).send('Error al obtener las solicitudes');
    }
};