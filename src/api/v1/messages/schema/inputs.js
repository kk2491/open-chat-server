"use strict";
const joi = require("joi");

const reactionsSchema = joi.object({
  name: joi.string().valid("like", "laugh").required(),
});

const createMessageInputSchema = joi.object({
  userId: joi.string().required(),
  message: joi.string().required(),
});

module.exports = {
  createMessageInputSchema: createMessageInputSchema,
  reactionsSchema: reactionsSchema,
};
