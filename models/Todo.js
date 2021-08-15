const { time } = require("console");
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  username: {type: String},
  tododate: {
    type: Date,
  },
  todotime: {
    type: String,
  },
});

module.exports = new mongoose.model("Todo", TodoSchema);
