    document.addEventListener('DOMContentLoaded', function () {
                fetch('http://localhost:4000/puestos/get')
                    .then(response => response.json())
                    .then(data => {
                        const puestosContainer = document.querySelector('.box'); // Contenedor de puestos de trabajo
                        puestosContainer.innerHTML = ''; 

                        data.forEach(puesto => {
                            const puestoElement = document.createElement('div');
                            puestoElement.className = 'inner-box';
                            puestoElement.innerHTML = `
                          <div id="titulo-cajas"><i class="fa-solid fa-briefcase"></i><h5>${puesto.Tipo_Puesto}</h5></div>
                          <p>Tipo Puesto: ${puesto.TipoContrato}</p>
                          <p>${puesto.Condiciones}</p>
                      `;
                            puestoElement.addEventListener('click', () => {
                            });
                            puestosContainer.appendChild(puestoElement);
                        });
                    })
                    .catch(error => console.error('Error fetching data:', error));
            });

            function fetchSolicitudes(idEmpresa) {
                fetch(`http://localhost:4000/solicitudes/${idEmpresa}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('La red no responde correctamente');
                        }
                        return response.json();
                    })
                    .then(data => {
                        let content = "";
                        data.forEach(solicitud => {
                            content += `
                                <div id="renderSolicitudes" class="inner-box" data-bs-toggle="modal" data-bs-target="#myModal2">
                                    <div id="titulo-cajas"><i class="fa-solid fa-briefcase"></i>
                                        <h5>${solicitud.Tipo_Puesto}</h5>
                                    </div>
                                    <p>Tipo Puesto: ${solicitud.Nombre}</p>
                                    <p>Tipo de Contrato: ${solicitud.Condiciones}</p>
                                </div>
                            `;
                        });
                        document.getElementById("cajaSolicitudes").innerHTML = content;
                    })
                    .catch(error => {
                        console.error('Error al obtener las solicitudes:', error);
                    });
            }