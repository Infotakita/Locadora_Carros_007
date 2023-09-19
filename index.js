const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const carros = require('./views/carros');

const index = express();

// Configurando o Handlebars
index.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
index.set('view engine', 'handlebars');

// Definindo o diretório de views
index.set('views', path.join(__dirname, 'views'));

// Configurando o diretório de arquivos estáticos (CSS, JS, etc.)
index.use(express.static(path.join(__dirname, 'public')));

// Rota principal
index.get('/', (req, res) => {
  res.render('home', { carros });
  index.get('/carro/:id', (req, res) => {
    const carroId = req.params.id;
    const carro = carros.find(carro => carro.id === carroId);

    if (!carro) {
        return res.send('Carro não encontrado');
    }

    res.render('carro', { carro });
});

});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
index.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
