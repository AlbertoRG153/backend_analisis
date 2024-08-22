document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://3.144.80.144:4000/personas/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.persona) {
                // Guardar el personaID en localStorage
                localStorage.setItem('personaID', data.persona.id);
                // Redirigir a la página principal
                window.location.href = '/principal.html';
            } else {
                alert('Error: ' + data.msg);
            }
        })
        .catch(error => console.error('Error:', error));
});
