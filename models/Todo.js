const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  todo: {
    type: String,
    required: [true, "Enter the todo"],
    unique: true,
  },
});
module.exports = mongoose.model("Todo", TodoSchema);
