"use strict";

const global = require("../../../config/global");
const services = require("./services");
const comService = require("../common/services");

const { createMessageInputSchema, reactionsSchema } = require("./schema/inputs");

module.exports = {
  createMessageInGroup: async function (req, res) {
    try {
      console.log("createMessageInGroup controller");
      let accountId = req.reqParams.accountId;
      let groupId = req.params.groupId;
      let createMessageInput = req.body;

      // input validation
      try {
        createMessageInput = await createMessageInputSchema.validateAsync(createMessageInput, { abortEarly: false });
        console.log("createMessageInput => ", createMessageInput);
      } catch (err) {
        console.log("createMessageInput input validation : ", err);
        console.log(err.details);
        res.status(400).json(err.details);
        return;
      }

      if (!(await comService.isValidGroup(groupId, accountId))) {
        res.status(global.error.groupNotFound.code).json(global.error.groupNotFound.msg);
        return;
      }

      let result = await services.createMessageInGroupService(accountId, groupId, createMessageInput);

      res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("createMessageInGroup controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  getMessagesInGroup: async function (req, res) {
    try {
      console.log("getMessagesInGroup controller");

      let accountId = req.reqParams.accountId;
      let groupId = req.params.groupId;

      if (!(await comService.isValidGroup(groupId, accountId))) {
        res.status(global.error.groupNotFound.code).json(global.error.groupNotFound.msg);
        return;
      }

      let result = await services.getMessagesInGroupService(accountId, groupId);

      res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("getMessagesInGroup controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  reactMessageById: async function (req, res) {
    try {
      console.log("reactMessageById controller");

      let accountId = req.reqParams.accountId;
      let groupId = req.params.groupId;
      let messageId = req.params.messageId;
      let reactMessageInput = req.body;

      // input validation
      try {
        reactMessageInput = await reactionsSchema.validateAsync(reactMessageInput, { abortEarly: false });
        console.log("reactMessageInput => ", reactMessageInput);
      } catch (err) {
        console.log("reactMessageInput input validation : ", err);
        console.log(err.details);
        res.status(400).json(err.details);
        return;
      }

      if (!(await comService.isValidGroup(groupId, accountId))) {
        res.status(global.error.groupNotFound.code).json(global.error.groupNotFound.msg);
        return;
      }

      if (!(await comService.isValidMessage(accountId, groupId, messageId))) {
        res.status(global.error.messageNotFound.code).json(global.error.messageNotFound.msg);
        return;
      }

      let result = services.reactMessageByIdService(accountId, groupId, messageId, reactMessageInput);

      res.status(result.code).json(result.msg);

      return;
    } catch (err) {
      console.log("reactMessageById controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },
};
