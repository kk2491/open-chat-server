"use strict";

const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema({
  adminName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  createdTimestamp: {
    type: Date,
  },
  lastUpdatedTimestamp: {
    type: Date,
  },
});

const Accounts = mongoose.model("Accounts", accountsSchema, "Accounts");

module.exports = { Accounts };
