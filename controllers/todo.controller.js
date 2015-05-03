var Todo = require("mongoose").model("Todo");


// Getting all the todos in the collection.
exports.getTodos = function(req, res, next){
  Todo.find(function(err, todos){
    if (err){
      return next(err);
    }
    res.json(todos);
  });
};


exports.deleteTodo = function(req, res, next){
  // Deleting todo by the user id which is populated by anyone of the
  // functions
  // TodoById, TodoByUsername, TodoByPriorities
  req.todo.remove(function(err){
    if (err){
      next(err);
    }
    res.json(req.todo);
  });
};


// Controller for creating a todo. Uses the key values in body object of the request.
exports.createTodo = function(req, res, next){
  var todo = {
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription || "",
    priority: req.body.priority
  };

  Todo.create(todo, function(err, todo){
    if (err){
      return next(err);
    }
    else {
      res.json(todo);
    }
  });
};


// Read a whole todo into the response by id
exports.readTodo = function(req, res, next){
  res.json(req.todo);
};

exports.taskById = function(req, res, next, id){
  Todo.findOne({
    _id: id
  }, function(err, todo){
    if (err){
      return next(err);
    }
    req.todo = todo;
    next();
  });
};
