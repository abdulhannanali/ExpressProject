var mongoose = require("mongoose"),
    moment = require("moment"),
    Schema = mongoose.Schema;

dateTimeFormats = ["MM-DD-YYYY", "MM-DD-YYYY HH:mmA"]

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
      var formattedDate = moment(date, dateTimeFormats);
      if (formattedDate.isValid()){
        return new Date(formattedDate.format());
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
      var formattedDate = moment(date, dateTimeFormats);
      if (formattedDate.isValid()){
        return new Date(formattedDate.format());
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
