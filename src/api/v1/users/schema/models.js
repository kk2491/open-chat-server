"use strict";

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  accountId: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  encryptedPassword: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
  },
  createdTimestamp: {
    type: Date,
  },
  lastUpdatedTimestamp: {
    type: Date,
  },
});

const Users = mongoose.model("Users", usersSchema, "Users");

module.exports = { Users };
