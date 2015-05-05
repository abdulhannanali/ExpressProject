var express = require("express"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    morgan = require("morgan"),
    jade = require("jade"),
    config = require("./config"),
    ejs = require("ejs"),
    moment = require("moment");

module.exports = function(){
  var app = express();

  if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    encoded: true
  }));

// EJS FILTERS
ejs.filters.displayTime = function(obj){
  var mObj = moment(obj);
  if (mObj.isValid()){
    return mObj.format("LT");
  }
  else {
    return "Invalid Time! Sorry!!!";
  }

  };

  ejs.filters.displayDate = function(obj){
    var mObj = moment(obj);
    if (mObj.isValid()){
      return mObj.format("ll");
    }
    else {
      return "Invalid Date!";
    }
  };

  // Setting the default views directory and the view engine
  app.set("views", "./views");
  app.set("view engine", "ejs");



  /// Routes in the /routes directory.
  /// Using express.router for the routes
  app.use(require("../routes/index.routes"));     // Index Routes
  app.use(require("../routes/todo.routes"));      // Routes for the todo side
  app.use(require("../routes/projects.routes"));  // Routes for the projects side



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
                        {
                          message: err.message,
                          stack: err.stack
                        });
 });

  return app;
};
