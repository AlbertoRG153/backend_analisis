document.getElementById('EmploginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://3.144.80.144:4000/empresa/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok && data.empresa) {
            // Guardar el empresaID en localStorage
            localStorage.setItem('empresaID', data.empresa.id);
            // Redirigir a la página principal de empresas
            window.location.href = '/principalEmpresas.html';
        } else {
            alert('Error: ' + data.msg);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});