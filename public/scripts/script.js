function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

document.getElementById('cpf').addEventListener('input', function(e) {
    let input = e.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length <= 11) {
        input.value = formatCPF(value);
    }
});

function formatEmail(email) {
    return /^[\w]+@[\w]+.[a-zA-Z]+$/.test(email)
}

function submitForm() {
    const form = document.getElementById('infoForm');
    const name = document.getElementById('name').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const age = document.getElementById('age').value.trim();

    if (name === '' || cpf === '' || age === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (isNaN(age) || age < 0) {
        alert('A idade não pode ser negativa.');
        return;
    }

    const formData = {
        name: name,
        cpf: cpf,
        age: age
    };

    fetch('/save-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Informações enviadas com sucesso');
            form.reset(); 
        } else {
            alert('Ocorreu um erro ao enviar as informações.');
        }
    })
    .catch(error => {
        alert('Ocorreu um erro: ' + error.message);
    });
}
