"use strict";

const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["like", "laugh"],
  },
});

const messagesSchema = new mongoose.Schema({
  accountId: {
    type: String,
  },
  groupId: {
    type: String,
  },
  userId: {
    type: String,
  },
  message: {
    type: String,
  },
  reactions: {
    type: [reactionSchema],
  },
  createdTimestamp: {
    type: Date,
  },
  lastUpdatedTimestamp: {
    type: Date,
  },
});

const Messages = mongoose.model("Messages", messagesSchema, "Messages");

module.exports = { Messages };
