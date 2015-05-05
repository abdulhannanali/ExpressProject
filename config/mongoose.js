var config = require("./config");
    mongoose = require("mongoose");


module.exports = function(){
  var db = mongoose.connect(config.mongoConnectionString);

  require('../models/todo.model');
  require('../models/projects.model');

  return db;
};
