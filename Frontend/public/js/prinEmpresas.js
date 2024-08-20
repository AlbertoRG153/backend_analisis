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