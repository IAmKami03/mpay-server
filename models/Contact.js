const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
  },
  subject: {
    type: String,
    reqired: true,
  },
  message: {
    type: String,
    reqired: true,
  },
  createdAt: {
    type: Date,
    defaut: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
