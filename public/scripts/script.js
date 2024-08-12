function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

document.getElementById('cpf').addEventListener('input', function(e) {
    e.target.value = formatCPF(e.target.value);
});

function submitForm() {
    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const age = parseInt(document.getElementById('age').value);

    if (age < 0) {
        alert('A idade não pode ser negativa.');
        return;
    }

    const formData = {
        name: name,
        cpf: cpf,
        age: age
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados salvos:', data);
        alert('Informações enviadas com sucesso');
    })
    .catch(error => console.error('Erro ao salvar dados:', error));
}
