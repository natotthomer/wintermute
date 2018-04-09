var express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

app.use('/', express.static('src'));

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }``
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
