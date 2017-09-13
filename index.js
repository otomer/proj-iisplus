const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Middleware - used by express first before anything else
app.use(express.static('public'));

app.use(express.static('src/views'));

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});

app.get('/x', (request, response) => {
  response.send('Hello from Express!');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened!', err)
  }

  console.log(`server is listening on ${port}`);
});