var todos = require("../controllers/todo.controller");

module.exports = function(app){
  app.route("/api/todos/")
    .get(todos.getTodos)
    .post(todos.createTodo);

  app.route("/api/todos/:taskId")
    .get(todos.readTodo)
    .delete(todos.deleteTodo);

  app.param("taskId", todos.taskById);

};
