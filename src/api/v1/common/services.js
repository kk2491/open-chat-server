"use strict";

const mongoose = require("mongoose");

const { Users } = require("../users/schema/models");
const { Groups } = require("../groups/schema/models");
const { Messages } = require("../messages/schema/models");

module.exports = {
  isEmailIdAlreadyExists: async function (email) {
    try {
      let userDoc = await Users.findOne({ email: email });

      if (userDoc) {
        return true;
      }

      return false;
    } catch (err) {
      console.log("isEmailIdAlreadyExists error : ", err);
      return true;
    }
  },

  isValidEmail: async function (email) {
    try {
      let userDoc = await Users.findOne({ email: email });

      if (userDoc) {
        return true;
      }

      return false;
    } catch (err) {
      console.log("isValidEmail error : ", err);
    }
  },

  isAdminUser: async function (userId) {
    try {
      let userDoc = await Users.findById(userId);

      if (!userDoc) {
        return false;
      }

      if (userDoc.role != "admin") {
        return false;
      }

      return true;
    } catch (err) {
      console.log("isValidEmail error : ", err);
      return false;
    }
  },

  isValidUser: async function (userId) {
    try {
      let userDoc = await Users.findById(userId);

      if (!userDoc) {
        return false;
      }

      return true;
    } catch (err) {
      console.log("isValidEmail error : ", err);
      return false;
    }
  },

  isValidGroup: async function (groupId, accountId) {
    try {
      let groupDoc = await Groups.findOne({
        _id: new mongoose.Types.ObjectId(groupId),
        accountId: accountId,
      });
      console.log("XXXXXXXXXXXX => ", groupDoc);

      if (!groupDoc) {
        return false;
      }

      return true;
    } catch (err) {
      console.log("isValidGroup error : ", err);
      return false;
    }
  },

  isMemberInGroup: async function (groupId, userId) {
    try {
      let groupData = await Groups.findOne({ _id: mongoose.Types.ObjectId(groupId), userIds: userId });

      if (groupData) {
        return true;
      }

      return false;
    } catch (err) {
      console.log("isMemberInGroup error : ", err);
    }
  },

  isValidMessage: async function (accountId, groupId, messageId) {
    try {
      let messageData = await Messages.findOne({
        _id: mongoose.Types.ObjectId(messageId),
        accountId: accountId,
        groupId: groupId,
      });

      if (messageData) {
        return true;
      }

      return false;
    } catch (err) {
      console.log("isMemberInGroup error : ", err);
    }
  },
};
