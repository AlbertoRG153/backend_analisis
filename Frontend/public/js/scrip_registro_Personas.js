document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    let isValid = true;

    // Validaciones
  
    if (!validateText(data.nombre)) {
        markInvalid('nombre');
        isValid = false;
    } else {
        markValid('nombre');
    }
    if (!validateText(data.apellido)) {
        markInvalid('apellido');
        isValid = false;
    } else {
        markValid('apellido');
    }
    if (!validateDate(data.fecha_nacimiento)) {
        markInvalid('fecha_nacimiento');
        isValid = false;
    } else {
        markValid('fecha_nacimiento');
    }
    if (!validatePhone(data.telefono)) {
        markInvalid('telefono');
        isValid = false;
    } else {
        markValid('telefono');
    }
    if (!validateEmail(data.correo)) {
        markInvalid('correo');
        isValid = false;
    } else {
        markValid('correo');
    }
    if (!validateAddress(data.direccion)) {
        markInvalid('direccion');
        isValid = false;
    } else {
        markValid('direccion');
    }if(!function validarIdentidad() {
        const identidad = document.getElementById('identidad').value;
        const patron = /^[0-9]{13}$/;
        if (!patron.test(identidad)) {
            alert('Por favor, ingrese un número de identidad válido de 13 dígitos.');
        }
        return true;
    }){
        markInvalid('identidad');
        isValid = false;  
    }else{
        markValid('identidad');
    }

    // Validaciones adicionales
    if (data.datos_trabajo === 'si') {
        if (!validateText(data.empresa)) {
            markInvalid('empresa');
            isValid = false;
        } else {
            markValid('empresa');
        }
        if (!validateText(data.puesto)) {
            markInvalid('puesto');
            isValid = false;
        } else {
            markValid('puesto');
        }
        if (!validateText(data.tipo_puesto)) {
            markInvalid('tipo_puesto');
            isValid = false;
        } else {
            markValid('tipo_puesto');
        }
        if (!validateNumber(data.anos_experiencia)) {
            markInvalid('anos_experiencia');
            isValid = false;
        } else {
            markValid('anos_experiencia');
        }
    }

    if (data.datos_estudios === 'si') {
        if (!validateText(data.tipo_estudio)) {
            markInvalid('tipo_estudio');
            isValid = false;
        } else {
            markValid('tipo_estudio');
        }
        if (!validateText(data.especialidad)) {
            markInvalid('especialidad');
            isValid = false;
        } else {
            markValid('especialidad');
        }
        if (!validateNumber(data.calificacion_media)) {
            markInvalid('calificacion_media');
            isValid = false;
        } else {
            markValid('calificacion_media');
        }
    }

    if (data.datos_legales === 'si') {
        if (!validateText(data.servicio_militar)) {
            markInvalid('servicio_militar');
            isValid = false;
        } else {
            markValid('servicio_militar');
        }
        if (!validateText(data.relacion_justicia)) {
            markInvalid('relacion_justicia');
            isValid = false;
        } else {
            markValid('relacion_justicia');
        }
    }

    if (data.datos_familiar === 'si') {
        if (!validateText(data.nombre_familiar)) {
            markInvalid('nombre_familiar');
            isValid = false;
        } else {
            markValid('nombre_familiar');
        }
        if (!validatePhone(data.telefono_familiar)) {
            markInvalid('telefono_familiar');
            isValid = false;
        } else {
            markValid('telefono_familiar');
        }
    }

    if (isValid) {
        alert('Registro exitoso');
    }
});

function validateText(text) {
    return text && /^[a-zA-Z\s]+$/.test(text);
}

function validateDate(date) {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const age = currentDate.getFullYear() - inputDate.getFullYear();
    const month = currentDate.getMonth() - inputDate.getMonth();
    if (month < 0 || (month === 0 && currentDate.getDate() < inputDate.getDate())) {
        age--;
    }
    return age >= 18;
}

function validatePhone(phone) {
    return phone && /^\d+$/.test(phone);
}

function validateEmail(email) {
    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateNumber(number) {
    return !isNaN(number) && number > 0;
}

function validateAddress(address) {
    return address && address.trim().length > 0;
}

function markInvalid(fieldId) {
    document.getElementById(fieldId).classList.add('invalid');
}

function markValid(fieldId) {
    document.getElementById(fieldId).classList.remove('invalid');
}

function toggleTrabajo(show) {
    document.getElementById('trabajo_info').style.display = show ? 'block' : 'none';
}

function toggleEstudios(show) {
    document.getElementById('estudios_info').style.display = show ? 'block' : 'none';
}

function toggleLegales(show) {
    document.getElementById('legales_info').style.display = show ? 'block' : 'none';
}

function toggleFamiliar(show) {
    document.getElementById('familiar_info').style.display = show ? 'block' : 'none';
}



function enviarDatos() {
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);

    const datos = {
        identidad: formData.get('identidad'),
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        fecha_nacimiento: formData.get('fecha_nacimiento'),
        direccion: `${formData.get('departamento')}, ${formData.get('ciudad')}, ${formData.get('direccion')}`,
        telefono: formData.get('telefono'),
        email: formData.get('correo'),
        password: formData.get('contrasena'),
        estado: 1, //valor fijo
        nombre_fam: formData.get('nombre_familiar'),
        telefono_fam: formData.get('telefono_familiar'),
        id_parentesco: formData.get('tipo_relacion'),
        tipo_estudio: formData.get('tipo_estudio'),
        especialidad: formData.get('especialidad'),
        promedio: formData.get('calificacion_media'),
        servicio_militar: formData.get('servicio_militar'),
        relacion_justicia: formData.get('relacion_justicia'),
        info_sanitaria: formData.get('info_sanitaria'),
        empresa: formData.get('empresa'),
        puesto: formData.get('puesto'),
        anios_experiencia: formData.get('anos_experiencia')
    };

    console.log('Datos enviados:', JSON.stringify(datos));

    fetch('http://localhost:4000/personas/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
}
