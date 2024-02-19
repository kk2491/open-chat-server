"use strict";
const joi = require("joi");

const signUpInputSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  reenterPassword: joi.string().required(),
});

const signInInputSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const inviteUserInputSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

// signout user - no required

const updateUserInputSchema = joi.object({
  name: joi.string(),
  phoneNumber: joi.string(),
});

// delete user - not required

const refreshTokenInputSchema = joi.object({
  refreshToken: joi.string().required(),
});

module.exports = {
  signUpInputSchema: signUpInputSchema,
  signInInputSchema: signInInputSchema,
  updateUserInputSchema: updateUserInputSchema,
  refreshTokenInputSchema: refreshTokenInputSchema,
  inviteUserInputSchema: inviteUserInputSchema,
};
