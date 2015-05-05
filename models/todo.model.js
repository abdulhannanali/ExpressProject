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
    required: true,
    get: function(date){
      return date;
    },
    set: function(date){
      return this.startDate;
    }
  },
  endDate: {
    type: Date,
    required: true,
    get:function(date){
      return date;
    },
    set: function(date){
      if (!date && this.startDate){
        return Date.now;
      }
      if (!date){
        return this.startDate;
      }
      return new Date(date);
    }
  },
  priority: {
    type: String,
    enum: ["High", "Low", "Medium"]
  }
});

mongoose.model("Todo", todoSchema);
