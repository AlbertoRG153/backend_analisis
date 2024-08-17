import { Int } from 'mssql';
import { getConnection, sql, queries } from '../database';
import bcrypt from 'bcrypt';

export const getPersona = async (req, res) => {

    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllPersonas);
        res.json(result.recordset);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const loginPersona = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Bad Request. Por favor proporciona email y password.' });
    }

    try {
        const pool = await getConnection();

        // Buscar al usuario por email
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query(queries.getPersonaByEmail);

        if (result.recordset.length === 0) {
            return res.status(401).json({ msg: 'Unauthorized. El email no está registrado.' });
        }

        const persona = result.recordset[0];

        // Verifica la contraseña
        const match = await bcrypt.compare(password, persona.password);

        if (!match) {
            return res.status(401).json({ msg: 'Unauthorized. La contraseña es incorrecta.' });
        }

        // Login exitoso
        res.status(200).json({
            message: 'Login exitoso',
            persona: {
                id: persona.ID,
                nombre: persona.nombre,
                apellido: persona.apellido,
                email: persona.email,
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error durante el login.' });
    }
};

/*
export const savePersona = async (req, res) => {
    const {
        identidad, nombre, apellido, fecha_nacimiento, direccion,
        telefono, email, password, infoLegal, infoSanitaria, Familiares,
        id_Familiar, nombre_fam, telefono_fam, id_parentesco, solicitante_id_Est,
        tipo_estudio, especialidad, promedio, id_solicitante_Leg, servicio_militar,
        relacion_justicia, id_persona_San, info_sanitaria
    } = req.body;

    if (!identidad || !nombre || !apellido || !fecha_nacimiento || !direccion || !telefono || !email || !password) {
        return res.status(400).json({ msg: 'Bad Request. Por favor llena todos los campos obligatorios.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const pool = await getConnection();

        const result = await pool.request()
            .input('identidad', sql.BigInt, identidad)
            .input('nombre', sql.VarChar, nombre)
            .input('apellido', sql.VarChar, apellido)
            .input('fecha_nacimiento', sql.Date, fecha_nacimiento)
            .input('direccion', sql.VarChar, direccion)
            .input('telefono', sql.VarChar, telefono)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .input('infoLegal', sql.Bit, infoLegal || null)
            .input('infoSanitaria', sql.Bit, infoSanitaria || null)
            .input('Familiares', sql.Bit, Familiares || null)
            .input('id_Familiar', sql.VarChar, id_Familiar || null)
            .input('nombre_fam', sql.VarChar, nombre_fam || null)
            .input('telefono_fam', sql.VarChar, telefono_fam || null)
            .input('id_parentesco', sql.Int, id_parentesco || null)
            .input('solicitante_id_Est', sql.BigInt, solicitante_id_Est || null)
            .input('tipo_estudio', sql.VarChar, tipo_estudio || null)
            .input('especialidad', sql.VarChar, especialidad || null)
            .input('promedio', sql.Decimal, promedio || null)
            .input('id_solicitante_Leg', sql.BigInt, id_solicitante_Leg || null)
            .input('servicio_militar', sql.VarChar, servicio_militar || null)
            .input('relacion_justicia', sql.VarChar, relacion_justicia || null)
            .input('id_persona_San', sql.BigInt, id_persona_San || null)
            .input('info_sanitaria', sql.VarChar, info_sanitaria || null)
            .execute('sp_SavePersona'); // Nombre del Stored Procedure

        res.status(201).json({ message: 'Persona guardada correctamente.' });

    } catch (error) {
        console.error('Error al guardar la persona:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error al guardar la información.' });
    }
};*/

/*export const savePersona = async (req, res) => {
    const { identidad, nombre, apellido, fecha_nacimiento, direccion, telefono, email, password, infoLegal, infoSanitaria, Familiares, id_Familiar, nombre_fam, telefono_fam, id_parentesco, solicitante_id_Est, tipo_estudio, especialidad, promedio, id_solicitante_Leg, servicio_militar, relacion_justicia, id_persona_San, info_sanitaria } = req.body;

    if (!identidad || !nombre || !apellido || !fecha_nacimiento || !direccion || !telefono || !email || !password) {
        return res.status(400).json({ msg: 'Bad Request. Por favor llena todos los campos obligatorios.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);

    try {
        await transaction.begin();

        // Guardar la persona
        const result = await transaction.request()
            .input('identidad', sql.BigInt, identidad)
            .input('nombre', sql.VarChar, nombre)
            .input('apellido', sql.VarChar, apellido)
            .input('fecha_nacimiento', sql.Date, fecha_nacimiento)
            .input('direccion', sql.VarChar, direccion)
            .input('telefono', sql.VarChar, telefono)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .query(queries.savePersona);
        
        const personaId = result.recordset[0].ID_Persona; // Asumiendo que tu consulta devuelve el ID generado

        // Insertar en la tabla Solicitantes
        await transaction.request()
            .input('ID_Persona', sql.BigInt, personaId)
            .query(queries.saveSolicitantes);

        // Obtener el ID del solicitante
        const solicitante_Id_Persona = (await transaction.request()
            .input('ID_Persona', sql.BigInt, personaId)
            .query(queries.getSolicitanteId)).recordset[0].ID;
       
        // Insertar en InformacionLegal, InformacionSanitaria y Estudios
        if (estudios) {
                    await pool.request()
                        .input("solicitante_id", sql.Int, solicitante_id_Est)
                        .input("tipo_estudio", sql.VarChar, tipo_estudio)
                        .input("especialidad", sql.VarChar, especialidad)
                        .input("promedio", sql.Decimal, promedio)
                        .input("solicitantes_id_persona", sql.BigInt, solicitante_Id_Persona)
                        .query(queries.saveEstudios);
        }

        if (infoLegal) {
            await transaction.request()
                .input("id_solicitante_leg", sql.Int, id_solicitante_Leg)
                .input("servicio_militar", sql.VarChar, servicio_militar)
                .input("relacion_justicia", sql.VarChar, relacion_justicia)
                .input("solicitantes_id_persona", sql.BigInt, solicitante_Id_Persona)
                .query(queries.saveInfoLegal);
        }

        if (infoSanitaria) {
            await transaction.request()
                .input("id_persona", sql.Int, id_persona_San)
                .input("infor_sanitaria", sql.VarChar, info_sanitaria)
                .input("solicitantes_id_Persona", sql.BigInt, solicitante_Id_Persona)
                .query(queries.saveInfoSanitaria);
        }

        if (Familiares){
            await transaction.request()
                .input("id_familiar", sql.VarChar, id_Familiar)
                .input("nombre_fam", sql.VarChar, nombre_fam)
                .input("telefono_fam", sql.VarChar, telefono_fam)
                .input("id_parentesco", sql.BigInt, id_parentesco)
                .input("solicitantes_id_persona", sql.BigInt, solicitante_Id_Persona)
                .query(queries.saveFamilia);
        }

        await transaction.commit();

        res.status(201).json({ id: personaId });

    } catch (error) {
        await transaction.rollback();
        console.error('Error saving persona and related data:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error al guardar la información.' });
    }
};*/

export const savePersona = async (req, res) => {
    try {
        const { identidad, nombre, apellido, fecha_nacimiento, direccion, telefono, email, password, estado, id_familiar, nombre_fam, telefono_fam, id_parentesco, tipo_estudio, especialidad, promedio, servicio_militar, relacion_justicia, info_sanitaria } = req.body;

        // Validación básica
        if (!identidad || !nombre || !apellido || !fecha_nacimiento || !direccion || !telefono || !email || !password || !nombre_fam || !telefono_fam || id_parentesco) {
            return res.status(400).json({ msg: 'Bad Request. Por favor llena todos los campos' });
        }

        // Encriptar la contraseña
        const saltRounds = 10; // Número de rondas de encriptación
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const pool = await getConnection();

        await pool.request()
            .input('identidad', sql.BigInt, identidad)
            .input('nombre', sql.VarChar, nombre)
            .input('apellido', sql.VarChar, apellido)
            .input('fecha_nacimiento', sql.Date, fecha_nacimiento)
            .input('direccion', sql.VarChar, direccion)
            .input('telefono', sql.VarChar, telefono)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword) //la contrasenia ya encriptada es la que mando a guardar a la ddbb
            .query(queries.savePersona);

        const estadoBuffer = Buffer.from([estado]);
            
        await pool.request()
            .input("ID_Persona", sql.BigInt, identidad)
            .input("estado", sql.Binary, estadoBuffer)
            .query(queries.saveSolicitantes);

        await pool.request()
            .input("solicitante_id_Persona", sql.BigInt, identidad)
            .input("id_familiar", sql.BigInt, id_familiar)
            .input("nombre_fam", sql.VarChar, nombre_fam)
            .input("telefono_fam", sql.VarChar, telefono_fam)
            .input("id_parentesco", sql.Int, id_parentesco)
            .query(queries.saveInfoFamilia);

         await pool.request()
            .input("tipo_estudio", sql.VarChar, tipo_estudio)
            .input("especialidad", sql.VarChar, especialidad)
            .input("promedio", sql.Decimal, promedio)
            .input("solicitantes_id", sql.BigInt, identidad)
            .query(queries.saveEstudios);

        await pool.request()
            .input("servicio_militar", sql.VarChar, servicio_militar)
            .input("relacion_justicia", sql.VarChar, relacion_justicia)
            .input("solicitantes_id", sql.BigInt, identidad)
            .query(queries.saveInfoLegal);

        await pool.request()
            .input("id_persona", sql.BigInt, identidad)
            .input("info_sanitaria", sql.VarChar, info_sanitaria)
            .input("solicitantes_id", sql.Int, identidad)
            .query(queries.saveInfoSanitaria);

        res.status(201).json({ identidad, nombre, apellido, fecha_nacimiento, direccion, telefono, email, estado, id_familiar, nombre_fam, telefono_fam, id_parentesco, tipo_estudio, especialidad, promedio, servicio_militar, relacion_justicia, info_sanitaria });

    } catch (error) {
        console.error('Error saving persona:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error al guardar la persona.' });
    }
};