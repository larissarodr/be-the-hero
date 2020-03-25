const express = require('express'); //pacote
const cors = require('cors');
const routes = require('./routes') //arquivo, por isso o ./

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);