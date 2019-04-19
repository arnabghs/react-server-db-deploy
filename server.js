const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/first-app/build"));

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "b4eafaa18cd5ba",
  password: "753c2f92",
  database: "heroku_ded7d36eeae9208"
});

const launchMissile = function(req, res) {
  const data = req.body.name;

  var person = { name: data };
  connection.query("INSERT INTO users SET ?", person, function(err, result) {
    if (err) console.log(err);
    console.log(result);
  });
  res.redirect("/get_details");
};

const getDetails = function(req, res) {
  let q =
    "SELECT count,name,date_format(launched_at,'%D %M %Y ____ %r') AS date from users;";
  connection.query(q, function(err, result) {
    if (err) console.log(err);
    let details = result.map(detail => {
      return { name: detail.name, time: detail.date };
    });
    res.send({ details });
  });
};

app.post("/add_name", launchMissile);
app.get("/get_details", getDetails);
app.listen(PORT, () => console.log("listening at port", PORT));
