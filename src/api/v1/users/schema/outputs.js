const joi = require("joi");

const signUpOutputSchema = joi.object({
  accountId: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  accessToken: joi.string().required(),
  refreshToken: joi.string().required(),
  tokenExpirationTime: joi.string().required(),
  createdTimestamp: joi.string().isoDate(),
  lastUpdatedTimestamp: joi.string().isoDate(),
});

const signInOuputSchema = joi.object({
  accountId: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  accessToken: joi.string().required(),
  refreshToken: joi.string().required(),
  tokenExpirationTime: joi.string().required(),
  createdTimestamp: joi.string().isoDate(),
  lastUpdatedTimestamp: joi.string().isoDate(),
});

const signOutOuputSchema = joi.object({
  status: joi.string().required(),
});

const updateUserOutputSchema = joi.object({
  accountId: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  createdTimestamp: joi.string().isoDate(),
  lastUpdatedTimestamp: joi.string().isoDate(),
});

const deleteUserOuputSchema = joi.object({
  status: joi.string().required(),
});

const getUserOuputSchema = joi.object({
  accountId: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  createdTimestamp: joi.string().isoDate(),
  lastUpdatedTimestamp: joi.string().isoDate(),
});

const getAllUsersOuputSchema = joi.array().items(getUserOuputSchema);

const refreshTokenOuputSchema = joi.object({
  accessToken: joi.string().required(),
  refreshToken: joi.string().required(),
  tokenExpirationTime: joi.string().isoDate(),
});

module.exports = {
  signUpOutputSchema: signUpOutputSchema,
  signInOuputSchema: signInOuputSchema,
  signOutOuputSchema: signOutOuputSchema,
  updateUserOutputSchema: updateUserOutputSchema,
  deleteUserOuputSchema: deleteUserOuputSchema,
  getUserOuputSchema: getUserOuputSchema,
  getUserOuputSchema: getUserOuputSchema,
  getAllUsersOuputSchema: getAllUsersOuputSchema,
  refreshTokenOuputSchema: refreshTokenOuputSchema,
};
