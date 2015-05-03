var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

todoSchema = new Schema({
  taskName: {
    type: String,
    required: true
  },
  taskDescription: String,
  status: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    enum: ["High", "Low", "Medium"]
  }
});

mongoose.model("Todo", todoSchema);
