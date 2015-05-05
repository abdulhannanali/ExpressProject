var mongoose = require("mongoose"),
    moment = require("moment"),
    Schema = mongoose.Schema;

var projectSchema = new Schema({
  projName: {
    type: String,
    required: true,
    trim: true
  },
  projDesc: {
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

projectSchema.virtual("shortProjDesc").get(function(){
  if (this.projDesc){
    return this.projDesc.slice(0, 100);
  }
  else {
    return "No Description";
  }
});



mongoose.model("Project", projectSchema);
