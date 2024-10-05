const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
});

const UserModal = mongoose.model("User", UserSchema);

module.exports = UserModal;
