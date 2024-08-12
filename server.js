const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/save-data', (req, res) => {
    const formData = req.body;
    const filePath = path.join(__dirname, 'data', 'data.json');

    fs.writeFile(filePath, JSON.stringify(formData, null, 2), err => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            res.status(500).send('Erro ao salvar os dados.');
            return;
        }
        res.send('Dados salvos com sucesso.');
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
