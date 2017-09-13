const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var nav = [
  { Text: 'Users', Link: "/Users" },
  { Text: 'Groups', Link: "/Groups" },
  { Text: 'Express', Link: "/Express" }

];
var usersRouter = require("./src/routes/userRoutes")(nav);
app.use("/Users", usersRouter);

//Middleware - used by express first before anything else
app.use(express.static('public'));

app.use(express.static('src/views'));

app.get('/', (request, response) => {
  //response.send('Hello from Express!');
  response.send(usersRouter);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //     message: err.message, 
  //     error: err
  // });
  res.send(err.message);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened!', err)
  }

  console.log(`server is listening on ${port}`);
});

 