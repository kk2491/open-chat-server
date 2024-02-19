"use strict";

const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema({
  accountId: {
    type: String,
  },
  name: {
    type: String,
  },
  userIds: {
    type: [String],
  },
  createdTimestamp: {
    type: Date,
  },
  lastUpdatedTimestamp: {
    type: Date,
  },
});

const Groups = mongoose.model("Groups", groupsSchema, "Groups");

module.exports = { Groups };
