const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var usersRouter = require("./src/routes/userRoutes")();
app.use("/Users", usersRouter);
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened!', err)
  }

  console.log(`server is listening on ${port}`);
});

