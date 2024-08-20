document.addEventListener("DOMContentLoaded", function() {
    fetchEmpresas(),
    fetchPuestos();
});

function fetchEmpresas() {
    fetch("http://localhost:4000/empresas/get")
        .then(response => {
            if (!response.ok) {
                throw new Error('la red no responde  ok');
            }
            return response.json();
        })
        .then(data => {
            let content = "";
            data.forEach(empresa => {
                content += `
                    <div class="inner-box" data-toggle="modal" data-target="#myModal1" onclick="fetchEmpresaById(${empresa.ID_Empresa})">
                        <div id="titulo-cajas"><i class="fa-solid fa-building"></i> <h5>${empresa.Nombre}</h5></div>
                        <p style="color: #B2B2B2;">${empresa.Direccion}</p>
                        <p style="color: #B2B2B2;">${empresa.Telefono}</p>
                    </div>
                `;
            });
            document.getElementById("caja1").innerHTML = content;
        })
        .catch(error => {
            console.error('este es el problema:', error);
        });
}
    // Función para obtener puestos
    function fetchPuestos() {
        fetch("http://localhost:4000/puestos/get")
            .then(response => response.json())
            .then(data => {
                let content = "";
                data.forEach(puesto => {
                    content += `
                        <div class="inner-box" data-toggle="modal" data-target="#myModal2" onclick="renderContrato(${puesto.ID_Puesto}, ${puesto.IdTipoContrato})">
                            <div id="titulo-cajas"><i class="fa-solid fa-briefcase"></i><h5>${puesto.Tipo_Puesto}</h5></div>
                            <p style="color: #B2B2B2;">${puesto.TipoContrato}</p>
                            <p style="color: #B2B2B2;">Empresa: ${puesto.Empresa}</p>
                        </div>
                    `;
                });
                document.getElementById("caja2").innerHTML = content;
            })
            .catch(error => console.error('Error al obtener los puestos:', error));
    }


function renderContrato(id_puesto, id_tipo_contrato) {
    // Guardar id_solicitud en localStorage
    localStorage.setItem('idPuesto', id_solicitud);

    //solicitud para obtener los detalles del contrato
    fetch(`http://localhost:4000/contrato/${id_puesto}/${id_tipo_contrato}`)
        .then(response => response.json())
        .then(data => {
            const modalBody = `
                <div id="ventana2" class="modal-body">
                    <h5>${data.nombre_puesto}</h5>
                    <h6>${data.tipo_puesto}</h6>
                    <h6>${data.empresa}</h6>
                    <p>Sueldo: ${data.sueldo}</p>
                    <h6>Requisitos:</h6>
                    <div id="requisitosMod">
                        ${data.requisitos.map(req => `<p>${req}</p>`).join('')}
                    </div>
                    <h6>${data.tipo_contrato}</h6>
                </div>
            `;

            // Renderizar los datos en el modal
            document.querySelector('.modal-body').innerHTML = modalBody;
        })
        .catch(error => console.error('Error al obtener los detalles del contrato:', error));
}
function postularPuesto() {
    // IDs del localStorage
    const id_solicitud = localStorage.getItem('id_solicitud');
    const id_solicitante = localStorage.getItem('personaID');

    const body = {
        id_solicitud: id_solicitud,
        id_solicitante: id_solicitante
    };

    fetch('http://localhost:4000/personas/apliTrabajo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Solicitud enviada exitosamente:', data);
        
    })
    .catch(error => {
        console.error('Error al enviar la solicitud:', error);
    });
}

function fetchEmpresaById(id) {
    fetch(`http://localhost:4000/empresa/get/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('la red no responde ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('empresaNombre').textContent = data.Nombre;
            document.getElementById('empresaDirector').textContent = `CEO: ${data.Director}`;
            document.getElementById('empresaCIF').textContent = `CIF: ${data.CIF}`;
            document.getElementById('empresaTelefono').textContent = data.Telefono;
            document.getElementById('empresaDireccion').textContent = data.Direccion;
            document.getElementById('empresaEmail').textContent = data.Email;
        })
        .catch(error => {
            console.error('Error fetching empresa data:', error);
        });
}