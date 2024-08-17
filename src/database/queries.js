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

    getAllPersonas: `SELECT * FROM Personas`,
    savePersona: 'INSERT INTO Personas (ID_Persona, Nombre, Apellido, Fecha_Nacimiento, Direccion, Telefono, Email, Password) VALUES (@identidad, @nombre, @apellido, @fecha_nacimiento, @direccion, @telefono, @email, @password);',
    saveSolicitantes: 'INSERT INTO Solicitantes (ID_Persona, Estado) VALUES (@personaId, 1);',
    saveEstudios: 'INSERT INTO Estudios (ID_Solicitante, Tipo_Estudio, Especialidad, Calificacion_Media, Solicitantes_ID_Persona) VALUES (@solicitante_id_Est, @tipo_estudio, @especialidad, @promedio, @solicitante_Id_Persona)',
    saveInfoFamilia: 'INSERT INTO Familiares (Solicitantes_ID_Persona, ID_Persona_Familiar, IDRelacion, Nombre, Telefono) VALUES (@solicitante_Id_Persona, @id_familiar, @nombre_fam, @telefono_fam, @id_parentesco)',
    saveInfoLegal: 'INSERT INTO Datos_Legales (ID_Solicitante, Servicio_Militar, Relacion_Justicia, Solicitantes_ID_Persona) VALUES (@id_solicitante_Leg, @servicio_militar, @relacion_justicia, @solicitante_Id_Persona)',
    saveInfoSanitaria: 'INSERT INTO Datos_Sanitarios (ID_Persona, Informacion_Saniaria, Solicitantes_ID_Personma) VALUES (@id_persona_San, @info_sanitaria, @solicitante_Id_Persona)'
};