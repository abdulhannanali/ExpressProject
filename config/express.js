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
  app.use(require("../routes/todo.routes"));



    // Static Middle ware for serving static files
    app.use(express.static('./public'));

  // 404 - NOT FOUND MIDDLEWARE
  app.use(function(req, res, next){
    res.status(404).render('404', {
      url: req.hostname + req.originalUrl
    });
  });

 // ERROR MIDDLEWARE
 app.use(function(err, req, res, next){
   res.status(500).render("errors",
                        {message: err.message,
                         stack: err.stack});
 });

  return app;
};
