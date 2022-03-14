require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/api/routes');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.APP_PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routes.userController);

app.use('/login', routes.loginController);

app.use('/categories', routes.categoryController);

app.use('/post', routes.postController);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
