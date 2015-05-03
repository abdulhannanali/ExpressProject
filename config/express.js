var express = require("express"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    morgan = require("morgan"),
    jade = require("jade"),
    config = require("./config");

module.exports = function(){
  var app = express();

  if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    encoded: true
  }));

  // Setting the default views directory and the view engine
  app.set("views", "./views");
  app.set("view engine", "ejs");

  /// Routes
  app.set(require("../routes/index.routes")(app));
  app.set(require("../routes/todo.routes")(app));

  // Static Middle ware for serving static files
  app.use(express.static(__dirname + "/public"));

  return app;
};
