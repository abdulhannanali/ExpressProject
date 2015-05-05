var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var projectsSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});
