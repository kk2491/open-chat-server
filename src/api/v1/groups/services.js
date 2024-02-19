"use strict";

const { Groups } = require("./schema/models");

module.exports = {
  createGroupService: async function (accountId, createGroupInput) {
    try {
      let groupObj = new Groups({
        accountId: accountId,
        name: createGroupInput.name,
        userIds: createGroupInput.userIds,
        createdTimestamp: Date.now(),
        lastUpdatedTimestamp: Date.now(),
      });

      let newGroup = await groupObj.save();
      let createGroupResponse = {
        id: newGroup._id.toString(),
        ...JSON.parse(JSON.stringify(newGroup)),
      };

      return {
        code: 200,
        msg: createGroupResponse,
      };
    } catch (err) {
      console.log("createGroupService error : ", err);
    }
  },

  deleteGroupService: async function (groupId) {
    try {
      let deletedGroup = await Groups.findByIdAndDelete(groupId);
      console.log("deletedGroup : ", deletedGroup);

      return {
        code: 200,
        msg: "success",
      };
    } catch (err) {
      console.log("deleteGroupService error : ", err);
    }
  },

  getAllGroupService: async function (accountId, queryParams) {
    try {
      let groupList = [];
      let groupQuery = { accountId: accountId };

      if (queryParams && queryParams.userId) {
        groupQuery.userIds = queryParams.userId;
      }

      let groups = await Groups.find(groupQuery);

      for (let i = 0; i < groups.length; i++) {
        groupList.push({ id: groups[i].id.toString(), ...JSON.parse(JSON.stringify(groups[i])) });
      }

      return {
        code: 200,
        msg: groupList,
      };
    } catch (err) {
      console.log("deleteGroupService error : ", err);
    }
  },

  getGroupByIdService: async function (groupId) {
    try {
      let group = await Groups.findById(groupId);

      if (group) {
        group = { id: group._id.toString(), ...JSON.parse(JSON.stringify(group)) };
        return {
          code: 200,
          msg: group,
        };
      }

      return {
        code: 404,
        msg: "Group not found",
      };
    } catch (err) {
      console.log("deleteGroupService error : ", err);
    }
  },

  updateGroupService: async function (groupId, updateGroupInput) {
    try {
      console.log("updateGroupService");
      let update = {};

      if (updateGroupInput.name) {
        update.name = updateGroupInput.name;
      }

      if (updateGroupInput.userIds && updateGroupInput.userIds) {
        update.$push.userIds = updateGroupInput.userIds;
      }

      let updatedDoc = await Groups.findByIdAndUpdate(groupId, update, { new: true });

      let updatedGroup = {
        id: updatedDoc._id.toString(),
        ...JSON.parse(JSON.stringify(updatedDoc)),
      };

      return {
        code: 200,
        msg: updatedGroup,
      };
    } catch (err) {
      console.log("updateGroupService error : ", err);
    }
  },
};
