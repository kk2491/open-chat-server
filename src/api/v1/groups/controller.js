"use strict";

const global = require("../../../config/global");
const services = require("./services");
const comService = require("../common/services");

const { createGroupInputSchema, updateGroupInputSchema } = require("./schema/inputs");

module.exports = {
  createGroup: async function (req, res) {
    try {
      console.log("createGroup controller");
      let accountId = req.reqParams.accountId;
      let createGroupInput = req.body;

      // input validation
      try {
        createGroupInput = await createGroupInputSchema.validateAsync(createGroupInput, { abortEarly: false });
        console.log("createGroupInput => ", createGroupInput);
      } catch (err) {
        console.log("createGroupInput input validation : ", err);
        console.log(err.details);
        res.status(400).json(err.details);
        return;
      }

      let result = await services.createGroupService(accountId, createGroupInput);

      res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("createGroup controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  deleteGroup: async function (req, res) {
    try {
      console.log("deleteGroup controller");
      let groupId = params.groupId;
      let accountId = req.reqParams.accountId;

      if (!(await comService.isValidGroup(groupId, accountId))) {
        res.status(global.error.groupNotFound.code).json(global.error.groupNotFound.msg);
        return;
      }

      let result = await services.deleteGroupService(groupId);

      res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("deleteGroup controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  getAllGroups: async function (req, res) {
    try {
      console.log("getAllGroups controller");
      let accountId = req.reqParams.accountId;
      let queryParams = req.query;

      let result = await services.getAllGroupService(accountId, queryParams);

      res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("getAllGroups controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  getGroupById: async function (req, res) {
    try {
      console.log("getGroupById controller");
      let groupId = req.params.groupId;
      let accountId = req.reqParams.accountId;

      if (!(await comService.isValidGroup(groupId, accountId))) {
        res.status(global.error.groupNotFound.code).json(global.error.groupNotFound.msg);
        return;
      }

      let result = await services.getGroupByIdService(groupId);

      res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("getGroupById controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  updateGroup: async function (req, res) {
    try {
      console.log("updateGroup controller");
      let groupId = params.groupId;
      let accountId = req.reqParams.accountId;
      let updateGroupInput = req.body;
      let errorExistingMember = null;

      if (!(await comService.isValidGroup(groupId, accountId))) {
        res.status(global.error.groupNotFound.code).json(global.error.groupNotFound.msg);
        return;
      }

      // input validation
      try {
        updateGroupInput = await updateGroupInputSchema.validateAsync(updateGroupInput, { abortEarly: false });
        console.log("updateGroupInput => ", updateGroupInput);
      } catch (err) {
        console.log("updateGroupInput input validation : ", err);
        console.log(err.details);
        res.status(400).json(err.details);
        return;
      }

      if (updateGroupInput.addUserIds && updateGroupInput.addUserIds.length > 0) {
        for (let i = 0; i < updateGroupInput.addUserIds.length; i++) {
          if (await comService.isMemberInGroup(groupId, updateGroupInput.addUserIds[i])) {
            errorExistingMember = {
              code: 400,
              msg: {
                code: 400,
                message: updateGroupInput.addUserIds[i] + " already exists in the group",
              },
            };
          }
        }
      }

      if (errorExistingMember) {
        res.status(errorExistingMember.code).json(errorExistingMember.msg);
        return;
      }

      let result = await services.updateGroupService(groupId, updateGroupInput);

      res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("updateGroup controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },
};
