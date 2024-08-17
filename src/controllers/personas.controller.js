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

export const savePersona = async (req, res) => {
    try {
        const { identidad, nombre, apellido, fecha_nacimiento, direccion, telefono, email, password, estado, nombre_fam, telefono_fam, id_parentesco, tipo_estudio, especialidad, promedio, servicio_militar, relacion_justicia, info_sanitaria, empresa, puesto, anios_experiencia } = req.body;

        // Validación básica
        if (!identidad || !nombre || !apellido || !fecha_nacimiento || !direccion || !telefono || !email || !password || !nombre_fam || !telefono_fam ) {
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
            .input("solicitante_Id_Persona", sql.BigInt, identidad)
            .input("id_familiar", sql.BigInt, identidad)
            .input("nombre_fam", sql.VarChar, nombre_fam)
            .input("telefono_fam", sql.VarChar, telefono_fam)
            .input("id_parentesco", sql.Int, id_parentesco)
            .query(queries.saveInfoFamilia);

         await pool.request()
            .input("tipo_estudio", sql.VarChar, tipo_estudio)
            .input("especialidad", sql.VarChar, especialidad)
            .input("promedio", sql.Decimal, promedio)
            .input("solicitante_Id_Persona", sql.BigInt, identidad)
            .query(queries.saveEstudios);

        await pool.request()
            .input("servicio_militar", sql.VarChar, servicio_militar)
            .input("relacion_justicia", sql.VarChar, relacion_justicia)
            .input("solicitante_id_Persona", sql.BigInt, identidad)
            .query(queries.saveInfoLegal);

        await pool.request()
            .input("id_persona_San", sql.BigInt, identidad)
            .input("info_sanitaria", sql.VarChar, info_sanitaria)
            .input("solicitante_Id_Persona", sql.BigInt, identidad)
            .query(queries.saveInfoSanitaria);

        await pool.request()
            .input("id_persona", sql.BigInt, identidad)
            .input("empresa", sql.VarChar, empresa)
            .input("puesto", sql.VarChar, puesto)
            .input("anios_experiencia", sql.Int, anios_experiencia)
            .input("solicitante_Id_Persona", sql.BigInt, identidad)
            .query(queries.saveExperienciaLaboral);


        res.status(201).json({ identidad, nombre, apellido, fecha_nacimiento, direccion, telefono, email, estado, nombre_fam, telefono_fam, id_parentesco, tipo_estudio, especialidad, promedio, servicio_militar, relacion_justicia, info_sanitaria, empresa, puesto, anios_experiencia });

    } catch (error) {
        console.error('Error saving persona:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error al guardar la persona.' });
    }
};