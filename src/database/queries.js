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
    /*savePersona: `
        EXEC sp_SavePersona
            @identidad = @identidad,
            @nombre = @nombre,
            @apellido = @apellido,
            @fecha_nacimiento = @fecha_nacimiento,
            @direccion = @direccion,
            @telefono = @telefono,
            @email = @email,
            @password = @password,
            @infoLegal = @infoLegal,
            @infoSanitaria = @infoSanitaria,
            @Familiares = @Familiares,
            @id_Familiar = @id_Familiar,
            @nombre_fam = @nombre_fam,
            @telefono_fam = @telefono_fam,
            @id_parentesco = @id_parentesco,
            @solicitante_id_Est = @solicitante_id_Est,
            @tipo_estudio = @tipo_estudio,
            @especialidad = @especialidad,
            @promedio = @promedio,
            @id_solicitante_Leg = @id_solicitante_Leg,
            @servicio_militar = @servicio_militar,
            @relacion_justicia = @relacion_justicia,
            @id_persona_San = @id_persona_San,
            @info_sanitaria = @info_sanitaria
    `*/
    savePersona: `INSERT INTO Personas (ID_Persona, Nombre, Apellido, Fecha_Nacimiento, Direccion, Telefono, Email, Password)
                    VALUES (@identidad, @nombre, @apellido, @fecha_nacimiento, @direccion, @telefono, @email, @password);`,
    saveSolicitantes: 'INSERT INTO Solicitantes (ID_Persona, Estado) VALUES (@ID_Persona, @estado);',
    saveInfoFamilia: 'INSERT INTO Familiares (Solicitantes_ID_Persona, ID_Persona_Familiar, IDRelacion, Nombre, Telefono) VALUES (@solicitante_Id_Persona, @id_familiar, @id_parentesco, @nombre_fam, @telefono_fam)',
    saveEstudios: 'INSERT INTO Estudios (Tipo_Estudio, Especialidad, Calificacion_Media, Solicitantes_ID_Persona) VALUES (@tipo_estudio, @especialidad, @promedio, @solicitante_Id_Persona)',  
    saveInfoLegal: 'INSERT INTO Datos_Legales (Servicio_Militar, Relacion_Justicia, Solicitantes_ID_Persona) VALUES (@servicio_militar, @relacion_justicia, @solicitante_Id_Persona)',
    saveInfoSanitaria: 'INSERT INTO Datos_Sanitarios (ID_Persona, Informacion_Sanitaria, Solicitantes_ID_Persona) VALUES (@id_persona_San, @info_sanitaria, @solicitante_id_Persona)',
    saveExperienciaLaboral: `INSERT INTO Experiencia_Laboral (ID_SOlicitante, Empresa, Puesto, Anios_Experiencia, Solicitantes_ID_Persona) VALUES (@id_persona, @empresa, @puesto, @años_experiencia, @solicitante_Id_Persona)`
};
