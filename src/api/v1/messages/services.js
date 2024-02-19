"use strict";

const { default: mongoose } = require("mongoose");
const { Messages } = require("./schema/models");
const { Users } = require("../users/schema/models");

module.exports = {
  createMessageInGroupService: async function (accountId, groupId, createMessageInput) {
    try {
      let messageObj = new Messages({
        accountId: accountId,
        groupId: groupId,
        userId: createMessageInput.userId,
        message: createMessageInput.message,
        createdTimestamp: Date.now(),
        lastUpdatedTimestamp: Date.now(),
      });

      let newMessage = await messageObj.save();

      let createMessageResponse = {
        id: newMessage._id.toString(),
        ...JSON.parse(JSON.stringify(newMessage)),
      };

      return {
        code: 200,
        msg: createMessageResponse,
      };
    } catch (err) {
      console.log("createMessageInGroupService error : ", err);
    }
  },

  getMessagesInGroupService: async function (accountId, groupId) {
    try {
      let messageList = [];
      let messages = await Messages.find({ accountId: accountId, groupId: groupId });
      console.log("messages : ", messages);

      for (let i = 0; i < messages.length; i++) {
        let userId = messages[i].userId;
        let userData = await Users.findById(userId);

        messageList.push({
          id: messages[i].id,
          sender: userData.name,
          ...JSON.parse(JSON.stringify(messages[i])),
        });
      }

      return {
        code: 200,
        msg: messageList,
      };
    } catch (err) {
      console.log("getMessagesInGroupService error : ", err);
    }
  },

  reactMessageByIdService: async function (accountId, groupId, messageId, reactionInput) {
    try {
      let updatedMessage = await Messages.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(messageId),
          accountId: accountId,
          messageId: messageId,
        },
        {
          $push: {
            name: reactionInput.name,
          },
        },
        { new: true }
      );

      let updatedMessageResponse = { id: updatedMessage._id.toString(), ...JSON.parse(JSON.stringify(updatedMessage)) };

      return {
        code: 200,
        msg: updatedMessageResponse,
      };
    } catch (err) {
      console.log("reactMessageByIdService error : ", err);
    }
  },
};
