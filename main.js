var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var database = [];

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('assets'));

app.get('/', function (req, res) {
  res.sendfile('assets/html/form.html');
});

app.get('/names', function (req, res) {
  var output = "<html><head><title>List Of Names</title></head><body><ul>";

  for (var name in database) {
    output += "<li>" + database[name] + "</li>";
  }

  output += "</ul>";
  output += "<a href='/html/links-page.html'>Back</a>";
  output += "</body></html>";
  res.send(output);
})

app.post('/form-handler', function (req, res)  {
  database.push(req.body.name);
  console.log('An entry was added to Database: ' + req.body.name);
  console.log(database);
  res.redirect('/html/links-page.html');
});

app.post('/names', function (req, res) {
  res.send(database);
});

app.listen(3000);