const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota personalizada para o formulário
app.get('/formulario-de-informacoes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const newData = req.body;

    const filePath = path.join(__dirname, 'data', 'data.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo JSON');
            return;
        }

        const jsonData = JSON.parse(data);
        jsonData.push(newData);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Erro ao salvar os dados');
                return;
            }
            res.json(newData);
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/formulario-de-informacoes`);
});
