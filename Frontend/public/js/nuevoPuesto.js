document.getElementById('puestoForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    //id_empresa desde el localStorage
    const id_empresa = localStorage.getItem('empresaID');

    if (!id_empresa) {
        alert('Error: No se encontró el ID de la empresa en el localStorage');
        return;
    }

    const datos = {
        tipo_puesto: formData.get('tipo_puesto'),
        condiciones: formData.get('condiciones'),
        id_empresa: id_empresa,
        tipo_contrato: formData.get('tipo_contrato'),
        salario_por_hora: formData.get('salario_por_hora'),
        horas_contrato: formData.get('horas_contrato'),
        idrequisito: formData.get('idrequisito'),
        tipo: formData.get('tipo')
    };

    try {
        const response = await fetch('http://localhost:4000/puestos/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            throw new Error('Error al guardar el puesto');
        }

        const result = await response.json();
        alert('Puesto guardado exitosamente');
        console.log('Puesto guardado:', result);
    } catch (error) {
        alert('Error al guardar el puesto');
        console.error('Error:', error);
    }
});

