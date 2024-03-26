const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

const vendorType = require('./controller/vendorType');
const vendorClass = require('./controller/vendorClass');
const vendor = require('./controller/vendor');

/* Middleware */
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */

app.use('/vendorType', vendorType);
app.use('/vendorClass', vendorClass);
app.use('/vendor', vendor);

const port = 3000;

app.listen(port, () => {
  console.log('Listening on port: ', port);
});
