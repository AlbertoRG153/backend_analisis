document.addEventListener('DOMContentLoaded', function () {
    const empresaID = localStorage.getItem('empresaID');
    fetchPuestos(empresaID);
    fetchSolicitudes(empresaID);
});

function fetchPuestos(empresaID) {
    fetch(`http://3.144.80.144:4000/empresa/puestos/${empresaID}`)
        .then(response => response.json())
        .then(data => {
            const puestosContainer = document.querySelector('.box'); // Contenedor de puestos de trabajo
            puestosContainer.innerHTML = '';

            data.forEach(puesto => {
                const puestoElement = document.createElement('div');
                puestoElement.className = 'inner-box';
                puestoElement.innerHTML = `<div class="inner-box" 
                data-bs-toggle="modal" data-bs-target="#myModal2" onclick="renderDetaPuesto(${puesto.ID_Puesto})">
                    <div id="titulo-cajas"><i class="fa-solid fa-briefcase"></i>
                        <h5>${puesto.Tipo_Puesto}</h5>
                    </div>
                    <p>Tipo Contrato: ${puesto.TipoContrato}</p>
                    <p>${puesto.Condiciones}</p>
                </div>`;
                puestoElement.addEventListener('click', () => {
                });
                puestosContainer.appendChild(puestoElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchSolicitudes(empresaID) {
    fetch(`http://3.144.80.144:4000/empresas/solicitudes/get/${empresaID}`)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => { throw new Error(error.message); });
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                alert('Aún no tiene solicitudes.');
                return;
            }

            let content = "";
            data.forEach(solicitud => {
                content += `
                     <div  class="inner-box" data-bs-toggle="modal" data-bs-target="#myModal3" 
                     onclick="renderDetaSol(${solicitud.ID_Solicitudes_Tipos})">
                        <div id="titulo-cajas"><i class="fa-solid fa-file-signature"></i>
                            <h5>${solicitud.Tipo_Puesto}</h5>
                        </div>
                        <p>${solicitud.TipoContrato}</p>
                        <p>Solicitante: ${solicitud.Nombre}</p>
                    </div>
                `;
            });
            document.getElementById("cajaSolicitud").innerHTML = content;
        })
        .catch(error => {
            alert(error.message);
            console.error('Error al obtener las solicitudes:', error);
        });
}



function renderDetaPuesto(id_puesto) {
    //solicitud para obtener los detalles del contrato
    fetch(`http://3.144.80.144:4000/puesto/get/${id_puesto}`)
        .then(response => response.json())
        .then(data => {
            const modalBody = `
                    <h5>${data.Tipo_Puesto}</h5>
                    <h6>${data.TipoContrato}</h6>
                    <h6>${data.Empresa}</h6>
                    <p>Sueldo: ${data.Sueldo}</p>
                    <h6>${data.TipoRequisito} : ${data.Requisito}</h6>
                    <h6> Condiciones: ${data.Condiciones}</h6>
            `;

            // Renderizar los datos en el modal
            document.querySelector('#modalBo2').innerHTML = modalBody;
        })
        .catch(error => console.error('Error al obtener los detalles del contrato:', error));
}
function renderDetaSol(id) {
    fetch(`http://3.144.80.144:4000/solicitudes/${id}`)
        .then(response => response.json())
        .then(data => {
            if (!data) {
                alert('No se encontró la solicitud.');
                return;
            }

            // Guardar IDs en sessionStorage
            sessionStorage.setItem('ID_Solicitudes_Tipos', data.ID_Solicitudes_Tipos);
            sessionStorage.setItem('ID_Solicitante', data.ID_Solicitante);

            // Renderizar datos en el modal
            const modalBody = document.getElementById('modalBo3');
            if (modalBody) {
                modalBody.innerHTML = `
                    <h5>${data.Tipo_Puesto}</h5>
                    <h6>${data.TipoContrato}</h6>
                    <p>${data.Sueldo}</p>
                    <h6>ID Solicitante: ${data.ID_Solicitante}</h6>
                    <h6>Nombre: ${data.Nombre}</h6>
                    <p>Especialidad: ${data.Especialidad}</p>
                `;
            } else {
                console.error('Elemento con ID "modalBo3" no encontrado.');
            }
        })
        .catch(error => {
            alert('Error al obtener la solicitud.');
            console.error('Error al obtener la solicitud:', error);
        });
}
function contratarSolicitante() {
    let ID_Solicitudes_Tipos = sessionStorage.getItem('ID_Solicitudes_Tipos');
    let ID_Solicitante = sessionStorage.getItem('ID_Solicitante');

    // Convertir a enteros
    ID_Solicitudes_Tipos = parseInt(ID_Solicitudes_Tipos, 10);
    ID_Solicitante = parseInt(ID_Solicitante, 10);

    if (isNaN(ID_Solicitudes_Tipos) || isNaN(ID_Solicitante)) {
        alert('No se encontraron los IDs válidos en sessionStorage.');
        return;
    }

    fetch('http://3.144.80.144:4000/empresa/contratar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ID_Solicitudes_Tipos, ID_Solicitante })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => { throw new Error(error.message); });
            }
            return response.json();
        })
        .then(data => {
            alert('Solicitante contratado exitosamente.');
            console.log('Datos de la solicitud actualizada:', data);
            location.reload();
        })
        .catch(error => {
            alert('Error al contratar al solicitante.');
            console.error('Error al contratar al solicitante:', error);
        });
}


