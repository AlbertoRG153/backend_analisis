export const queries = {

    getAllEmpresa: `SELECT * FROM Empresas`,
    saveEmpresa: `INSERT INTO Empresas (Nombre, CIF, Director, Direccion, Telefono, Email, Estado, Contrasenia) VALUES
                    (@nombre, @cif, @director, @direccion, @telefono, @email, @estado, @contrasenia);`,
    getEmpresaById: `SELECT * FROM Empresas
                        WHERE ID_Empresa = @Id`,
    deleteEmpresaById: `DELETE FROM Empresas WHERE ID_Empresa = @Id`,
    updateEmpresaById: `UPDATE Empresas SET Nombre = @nombre, CIF = @cif, Director = @director, Direccion = @direccion, Telefono = @telefono, Email = @email, Estado = @estado, Contrasenia = @contrasenia
                            WHERE ID_Empresa = @Id`,
    getLoginEmpresa: `SELECT * FROM Empresas WHERE email = @email AND contrasenia = @contrasenia;`,
    saveSolicitudPuesto: 'INSERT INTO Solicitudes_Empleo (Tipo_Puesto_Solicitado, Limitaciones, Deseos, SalarioMax, SalarioMin) VALUES (@tipo_puesto, @limitaciones, @deseos, @salario_max, @salario_min)',

    getAllPersonas: `SELECT * FROM Personas`,
    getPersonaByEmail: `SELECT * FROM Personas WHERE email = @email`,
    savePersona: `INSERT INTO Personas (ID_Persona, Nombre, Apellido, Fecha_Nacimiento, Direccion, Telefono, Email, Password, CV)
                    VALUES (@identidad, @nombre, @apellido, @fecha_nacimiento, @direccion, @telefono, @email, @password, @cv);`,
    saveSolicitantes: 'INSERT INTO Solicitantes (ID_Persona, Estado) VALUES (@ID_Persona, @estado);',
    saveInfoFamilia: 'INSERT INTO Familiares (Solicitantes_ID_Persona, ID_Persona_Familiar, IDRelacion, Nombre, Telefono) VALUES (@solicitante_Id_Persona, @id_familiar, @id_parentesco, @nombre_fam, @telefono_fam)',
    saveEstudios: 'INSERT INTO Estudios (Tipo_Estudio, Especialidad, Calificacion_Media, Solicitantes_ID_Persona) VALUES (@tipo_estudio, @especialidad, @promedio, @solicitante_Id_Persona)',  
    saveInfoLegal: 'INSERT INTO Datos_Legales (Servicio_Militar, Relacion_Justicia, Solicitantes_ID_Persona) VALUES (@servicio_militar, @relacion_justicia, @solicitante_Id_Persona)',
    saveInfoSanitaria: 'INSERT INTO Datos_Sanitarios (ID_Persona, Informacion_Sanitaria, Solicitantes_ID_Persona) VALUES (@id_persona_San, @info_sanitaria, @solicitante_id_Persona)',
    saveExperienciaLaboral: `INSERT INTO Experiencia_Laboral (ID_Solicitante, Empresa, Puesto, Anios_Experiencia, Solicitantes_ID_Persona) VALUES (@id_persona, @empresa, @puesto, @anios_experiencia, @solicitante_Id_Persona)`,
    getAllSolEmpleo: 'SELECT * FROM Solicitudes_Empleo',
    saveSolicitudesTipo: 'INSERT INTO Solicitudes_Tipos (ID_Solicitud, ID_Solicitante, ID_Puesto, TipoPuesto) VALUES (@ID_Solicitud, @ID_Solicitante, @ID_Puesto, , @Tipo_Empleo)'
};
