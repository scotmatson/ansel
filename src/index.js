const express = require('express');

const app = express();

app.use('/api', require('./api'));

app.listen(1902, () => { console.log('Server is listening on port 1902') });
