var Todo = require("mongoose").model("Todo"),
    moment = require("moment");

// Getting all the todos in the collection.
exports.getTodos = function(req, res, next){
  Todo.find(function(err, todos){
    if (err){
      return next(err);
    }
    console.log(todos.startDateF);
    res.render('todos', {
      todos: todos,
      message: 'With all the liberalism all the todos are here...',
      remove: false,
      form: true,
      isEmpty: isEmpty(todos)
    });
  });
};


exports.deleteTodo = function(req, res, next){
  // Deleting todo by the user id which is populated by anyone of the
  // functions
  // TodoById, TodoByUsername, TodoByPriorities
  req.todo.remove(function(err){
    if (err){
      res.json(err);
    }
    res.redirect("/todos");
  });
};


// Controller for creating a todo. Uses the key values in body object of the request.
exports.createTodo = function(req, res, next){
  var todo = {
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription || "",
    priority: req.body.priority,
    startDate: dateTime(req.body.startDate, req.body.startTime),
    endDate: dateTime(req.body.endDate, req.body.endTime)
  };

  Todo.create(todo, function(err, todo){
    if (err){
      return next(err);
    }
    else {
      res.redirect("/todos");
    }
  });
};

exports.todoCreationPage = function(req, res, next){
  req.todo = {
    taskName: "",
    taskDescription: "",
    priority: ""
  };
  res.render("newTask", {
    todo: req.todo,
    title: "Creating a new todo. Nice!!! Be Sure to complete it",
    formAction: "/todos/create",
    update: false
    });
};


exports.updateTodo = function(req, res, next){
  /// Constructing the todo object which is to be inserted for updating the document
  var todo = {
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    piority: req.body.priority
  };

  if (req.body.startDate){
    todo.startDate = dateTime(req.body.startDate, req.body.startTime);
  }
  if (req.body.endDate){
    todo.endDate = dateTime(req.body.endDate, req.body.endTime);
  }

  Todo.findByIdAndUpdate(req.todo.id, todo, function(err,user){
    if (err){
      return next(err);
    }
    else {
      res.redirect("/todos");
    }
  });
};

exports.updateInsert = function(req, res, next){
  res.render("newTask", {
    todo: req.todo,
    formAction: "/todos/update/" + req.todo.id,
    title: "Updating a todo! I <3 Updates",
    update: true
  });
};


// Read a whole todo into the response by id
exports.readTodo = function(req, res, next){
  res.json(req.todo);
};

exports.searchTodos = function(req, res, next){
  var body = {
    taskName: new RegExp(req.body.taskName,"ig"),
    taskDescription: new RegExp(req.body.taskDescription, "ig")
  };
  var remove = req.body.check === "remove";
  Todo.find(body, function(err, todos){
    if (err){
      return next(err);
    }
    if (remove){
      Todo.remove(body, function(err, todos){
        if (err){
          return next(err);
        }
      });
    }
    res.render('todos',{
      todos: todos,
      message: "The term you searched for matched the following results",
      form: false,
      remove: remove,
      isEmpty: isEmpty(todos)
    });
  });
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

var isEmpty = function(arr){
  if (arr[0] === undefined)
  {
    return true;
  }
  else {
    return false;
  }
};


var dateTime = function(date , time){
  var dt = date + " " + time;
  return moment(dt, dateTimeFormats).toDate();
};
