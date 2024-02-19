"use strict";
const joi = require("joi");

const createGroupInputSchema = joi.object({
  name: joi.string().required(),
  userIds: joi.array().items(joi.string()).required(),
});

const updateGroupInputSchema = joi.object({
  name: joi.string(),
  addUserIds: joi.array().items(joi.string()),
});

module.exports = {
  createGroupInputSchema: createGroupInputSchema,
  updateGroupInputSchema: updateGroupInputSchema,
};
