var todos = require("../controllers/todo.controller");
var router = require('express').Router();

router.route("/todos")
  .get(todos.getTodos)
  .post(todos.createTodo);

// Routes for creating the tasks
router.route("/todos/create")
    .get(todos.todoCreationPage)
    .post(todos.createTodo);

      // Searching routes
router.route("/todos/search")
    .post(todos.searchTodos);


router.route("/todos/update/:taskId")
  .get(todos.updateInsert)
  .post(todos.updateTodo);

router.get("/todos/delete/:taskId", todos.deleteTodo);
router.param("taskId", todos.taskById);

/// Any route if uncatched will be taken router.route /todos
router.route("/todos/*").get(todos.getTodos);

module.exports = router;
