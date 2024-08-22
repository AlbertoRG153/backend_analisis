document.addEventListener('DOMContentLoaded', () => {
    const puestoForm = document.getElementById('puesto-form');

    puestoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Recoger datos del formulario
        const tipo_puesto = document.getElementById('tipo_puesto').value;
        const condiciones = document.getElementById('condiciones').value;
        const id_empresa = document.getElementById('id_empresa').value;

        // Verificar que todos los campos estén llenos
        if (!tipo_puesto || !condiciones || !id_empresa) {
            alert('Por favor llena todos los campos.');
            return;
        }

        // Datos a enviar al backend
        const data = {
            tipo_puesto,
            condiciones,
            id_empresa
        };

        try {
            // Enviar datos al backend
            const response = await fetch('http://3.144.80.144:4000/puesto/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Verificar respuesta
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error desconocido');
            }

            const result = await response.json();
            alert('Puesto guardado exitosamente!');
            console.log(result);

            // Limpiar el formulario
            puestoForm.reset();
        } catch (error) {
            alert('Error al guardar el puesto: ' + error.message);
        }
    });
});
