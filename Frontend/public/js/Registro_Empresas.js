document.getElementById('empresaRegisterForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const datos = {
        nombre: formData.get('nombre'),
        cif: formData.get('cif'),
        director: formData.get('director'),
        direccion: formData.get('direccion'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        estado: 1, // valor fijo
        password: formData.get('password')

    };

    // Validar los datos
    const validation = validateForm(datos);
    if (!validation) {
        alert('Error: ' + validation.msg);
        return;
    }

    try {
        const response = await fetch('http://3.144.80.144:4000/empresa/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Empresa registrada con éxito');
        } else {
            alert('Error: ' + result.msg);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById('updateButton').addEventListener('click', async function () {
    const empresaId = document.getElementById('empresaId').value;
    const formData = new FormData(document.getElementById('empresaRegisterForm'));
    const data = Object.fromEntries(formData.entries());
    let isValid = validateForm(data);

    if (empresaId && isValid) {
        try {
            const response = await fetch(`http://3.144.80.144:4000/empresa/update/${empresaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Actualización exitosa');
                console.log('Empresa actualizada:', result);
            } else {
                const error = await response.json();
                alert('Error en la actualización: ' + error.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error en la actualización');
        }
    } else {
        alert('Por favor selecciona una empresa válida');
    }
});

document.getElementById('deleteButton').addEventListener('click', async function () {
    const empresaId = document.getElementById('empresaId').value;

    if (empresaId) {
        try {
            const response = await fetch(`http://3.144.80.144:4000/empresa/delete/${empresaId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Empresa eliminada correctamente');
            } else {
                const error = await response.json();
                alert('Error al eliminar la empresa: ' + error.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al eliminar la empresa');
        }
    } else {
        alert('Por favor selecciona una empresa válida');
    }
});

function validateForm(data) {
    let isValid = true;

    if (!validateText(data.nombre)) {
        markInvalid('nombre');
        isValid = false;
    } else {
        markValid('nombre');
    }
    if (!validateCIF(data.cif)) {
        markInvalid('cif');
        isValid = false;
    } else {
        markValid('cif');
    }
    if (data.director && !validateText(data.director)) {
        markInvalid('director');
        isValid = false;
    } else {
        markValid('director');
    }
    if (data.direccion && !validateAddress(data.direccion)) {
        markInvalid('direccion');
        isValid = false;
    } else {
        markValid('direccion');
    }
    if (data.telefono && !validatePhone(data.telefono)) {
        markInvalid('telefono');
        isValid = false;
    } else {
        markValid('telefono');
    }
    if (data.email && !validateEmail(data.email)) {
        markInvalid('email');
        isValid = false;
    } else {
        markValid('email');
    }

    return isValid;
}

function markInvalid(fieldId) {
    document.getElementById(fieldId).classList.add('invalid');
}

function markValid(fieldId) {
    document.getElementById(fieldId).classList.remove('invalid');
}

function validateText(text) {
    return text && text.trim().length > 0;
}

function validateCIF(cif) {
    // Validación del CIF
    return true;
}

function validateAddress(address) {
    return address && address.trim().length > 0;
}

function validatePhone(phone) {
    return phone && phone.trim().length > 0;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}
