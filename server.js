var express = require('express');

const app = express();

// const port = 3000;

app.use('/', express.static('src'));

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});

// app.listen(port, function() {
//   console.log("Server Started at port 3000");
// });
