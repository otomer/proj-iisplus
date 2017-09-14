const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var usersRouter = require("./src/routes/apiRoutes")();
app.use("/api", usersRouter);
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', (request, response) => {
  response.send('Stay Away!');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened!', err)
  }

  console.log(`server is listening on ${port}`);
});

