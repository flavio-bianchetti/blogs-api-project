require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
