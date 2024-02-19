"use strict";

const {
  signUpInputSchema,
  signInInputSchema,
  inviteUserInputSchema,
  updateUserInputSchema,
  refreshTokenInputSchema,
} = require("./schema/inputs");

const services = require("./services");
const comServices = require("../common/services");

const global = require("../../../config/global");

module.exports = {
  // completed
  signUpUser: async function (req, res) {
    try {
      console.log("signUp user controller");
      let signUpUserInput = req.body;

      // input validation
      try {
        signUpUserInput = await signUpInputSchema.validateAsync(signUpUserInput, { abortEarly: false });
        console.log("signUpUserInput => ", signUpUserInput);
      } catch (err) {
        console.log("signUpUser input validation : ", err);
        console.log(err.details);
        res.status(400).json(err.details);
        return;
      }

      if (await comServices.isEmailIdAlreadyExists(signUpUserInput.email)) {
        res.status(global.error.existingEmailError.code).json(global.error.existingEmailError.msg);
        return;
      }

      let result = await services.signUpUserService(signUpUserInput);

      await res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("signUpUser controller error : ", err);
      res.staus(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  inviteUser: async function (req, res) {
    try {
      console.log("inviteUser controller");
      let inviteUserInput = req.body;

      // input validation
      try {
        inviteUserInput = await inviteUserInputSchema.validateAsync(inviteUserInput, { abortEarly: false });
        console.log("inviteUserInput => ", inviteUserInput);
      } catch (err) {
        console.log("inviteUserInput input validation : ", err);
        console.log(err.details);
        res.status(400).json(err.details);
        return;
      }

      if (await comServices.isEmailIdAlreadyExists(inviteUserInput.email)) {
        res.status(global.error.existingEmailError.code).json(global.error.existingEmailError.msg);
        return;
      }

      if (!(await comServices.isAdminUser(req.reqParams.userId))) {
        res.status(global.error.insufficientPrivilege.code).json(global.error.insufficientPrivilege.msg);
        return;
      }

      let result = await services.inviteUserService(req, inviteUserInput);

      await res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("inviteUserInput controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  // completed
  signInUser: async function (req, res) {
    try {
      let signInUserInput = req.body;

      try {
        signInUserInput = await signInInputSchema.validateAsync(signInUserInput, { abortEarly: false });
      } catch (err) {
        console.log("signInUser input validation error : ", err);
        res.status(400).json(err.details);
        return;
      }

      if (!(await comServices.isValidEmail(signInUserInput.email))) {
        res.status(400).json({
          code: 400,
          message: "please enter the valid email",
        });
      }

      let result = await services.signInUserService(signInUserInput);

      await res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("signInUser controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  signOutUser: async function () {
    try {
      return {
        code: 200,
        msg: "success",
      };
    } catch (err) {
      console.log("signOutUser controller error : ", err);
      res.status(global.error.internalError.code).json(global.error.internalError.msg);
      return;
    }
  },

  updateUser: async function (req, res) {
    try {
      console.log("updateUser controller");
      let updateUserInput = req.body;
      let userId = req.params.userId;

      // input validation
      try {
        updateUserInput = await updateUserInputSchema.validateAsync(updateUserInput, { abortEarly: false });
        console.log("updateUserInput => ", updateUserInput);
      } catch (err) {
        console.log("updateUserInput input validation : ", err);
        console.log(err.details);
        res.status(400).json(err.details);
        return;
      }

      if (!(await comServices.isAdminUser(req.reqParams.userId))) {
        res.status(global.error.insufficientPrivilege.code).json(global.error.insufficientPrivilege.msg);
        return;
      }

      if (!(await comServices.isValidUser(userId))) {
        res.status(global.error.userNotFound.code).json(global.error.userNotFound.msg);
        return;
      }

      let result = await services.updateUserService(userId, updateUserInput);

      await res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("updateUser controller error : ", err);
    }
  },

  deleteUser: async function (req, res) {
    try {
      console.log("deleteUser controller");
      let userId = req.params.userId;

      if (!(await comServices.isAdminUser(req.reqParams.userId))) {
        res.status(global.error.insufficientPrivilege.code).json(global.error.insufficientPrivilege.msg);
        return;
      }

      if (!(await comServices.isValidUser(userId))) {
        res.status(global.error.userNotFound.code).json(global.error.userNotFound.msg);
        return;
      }

      let result = await services.deleteUserService(userId);

      await res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("updateUser controller error : ", err);
    }
  },

  getAllUsers: async function (req, res) {
    console.log("getAllUsers controller");
    let accountId = req.reqParams.accountId;
    let queryParams = req.queryParams;

    let result = await services.getAllUsersService(accountId, queryParams);

    await res.status(result.code).json(result.msg);
    return;
  },

  getUserById: async function (req, res) {
    try {
      console.log("getUserById controller");
      let userId = req.params.userId;

      if (!(await comServices.isValidUser(userId))) {
        res.status(global.error.userNotFound.code).json(global.error.userNotFound.msg);
        return;
      }

      let result = await services.getUserByIdService(userId);

      await res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("updateUser controller error : ", err);
    }
  },

  refreshToken: async function (req, res) {
    try {
      let refereshTokenInput = req.body;

      try {
        refereshTokenInput = await refreshTokenInputSchema.validateAsync(refereshTokenInput);
      } catch (err) {
        console.log("refreshToken input validation error : ", err);
        res.status(400).json("Input error");
        return;
      }

      let result = await services.getNewTokens(refereshTokenInput);

      await res.status(result.code).json(result.msg);
      return;
    } catch (err) {
      console.log("signIn controller error : ", err);
      res.status(500).json("Internal error message, please contact developers");
      return;
    }
  },
};
