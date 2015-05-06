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
  startDate: {
    type: Date,
    set: function(date){
      var formattedDate = new Date(date);
      if (typeof(formattedDate) !== "string"){
        return formattedDate;
      }
      else {
        return Date.now();
      }
    },
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    set: function(date){
      var formattedDate = new Date(date);
      if (typeof(formattedDate) !== "string"){
        return formattedDate;
      }
      else {
        return Date.now();
      }
    }
  },
  priority: {
    type: String,
    enum: ["High", "Low", "Medium"]
  }
});



mongoose.model("Todo", todoSchema);
