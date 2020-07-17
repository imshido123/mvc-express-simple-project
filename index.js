/*Dependencies*/
const express = require('express');
const path = require('path');
const productsApiRouter = require('./routes/api/products');
const  { logErrors, clientErrorHandler, errorHandler } = require('./utils/middlewares/errorHandlers');

/*Enabling app*/
const app = express();

/*Settings*/
const PORT = 8000;

/*Middlewares*/
app.use(express.json()); // Enabling JSON in routes operations

/*End Points*/
app.use('/api/products', productsApiRouter); // Routes
app.use('/static', express.static(path.join(__dirname,"public"))); // Enablign static files: exposing anything stored under ./public/

/*Redirect*/
app.get('/', (req, res) => {
    res.redirect('/products');
});

/*Error Handler*/
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

/*Instantiating the server*/
const server = app.listen(PORT, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
});