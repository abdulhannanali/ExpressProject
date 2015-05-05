var Project = require("mongoose").model("Project");

exports.getProjectsIndex = function(req, res, next){
  Project.find({}, function(err, projects){
    if (err){
      return next(err);
    }
    res.render('index', {
      projs: projects
    });
  });
};
