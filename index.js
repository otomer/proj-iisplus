const express = require('express');
const fs = require('fs');
const dirs = fs.readdirSync('node_modules');
var API = require("./public/js/api");
var _ = require("underscore");
const app = express();
const port = process.env.PORT || 3000;

var nav = [
  { Text: 'Users', Link: "/Users" },
  { Text: 'Groups', Link: "/Groups" },
  { Text: 'Express', Link: "/Express" }

];
var getPeriod = function() {
    var data = [
      [0, 4, "Good night"],
      [5, 11, "Good morning"],          //Store messages in an array
      [12, 17, "Good afternoon"],
      [18, 21, "Good evening"],
      [22, 24, "Good night"]
  ];

  var hour = new Date().getHours();
  var text = "";
    for(var i = 0; i < data.length; i++){
      if(hour >= data[i][0] && hour <= data[i][1]){
          text = data[i][2];
      }
  }
    return { text: text, hour: hour };
}

var usersRouter = require("./src/routes/userRoutes")(nav);
var apiRouter = require("./src/routes/apiRoutes")(nav);
var groupsRouter = require("./src/routes/groupRoutes")(nav);

//Middleware - used by express first before anything else
app.use(express.static('public'));
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/Users", usersRouter);
app.use("/Groups", groupsRouter);
app.use("/api", apiRouter);

app.get('/', function (request, response) {
  response.render('index', {
    title: "Index",
    period: getPeriod(),
    nav: nav
  });
});

app.get("/usersjson", function (req, res) {
  API.collections.users.get()
    .done(function (users) {
      if (users) {
        res.send(users);
      }
      else {
        res.send("No Users");
      }
    })
    .fail(function () {
      res.send("Failed to get Users");
    });
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened!', err)
  }

  console.log(`server is listening on ${port}`);
});


const data = {};
dirs.forEach(function (dir) {
  try {
    var file = 'node_modules/' + dir + '/package.json';
    file = fs.readFileSync(file, 'utf8');
    var json = JSON.parse(file);
    var name = json.name;
    var version = json.version;
    data[name] = version;
  } catch (err) {

  }
});

app.get('/express', (request, response) => {
  response.send("Node Express Version: " + data['express']);
});