"use strict";

const global = require("../../../config/global");
const authServices = require("../../../middleware/auth");

const { Accounts } = require("../common/schema/accounts_model");
const { Users } = require("./schema/models");

module.exports = {
  signUpUserService: async function (signUpUserInput) {
    try {
      let accountId = await module.exports.createAccount(signUpUserInput.name, signUpUserInput.email);

      let newUser = await module.exports.createUser(signUpUserInput, accountId, "admin");

      let accessToken = await authServices.generateAccessToken(newUser.id, newUser.email, accountId);

      let refreshToken = await authServices.generateRefreshToken(newUser.id, newUser.email, accountId);

      let signupResponse = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        tokenExpirationTime: global.jwtTokenExpirationTime,
        ...JSON.parse(JSON.stringify(newUser)),
      };

      return { code: 200, msg: signupResponse };
    } catch (err) {
      console.log("signUpUserService error : ", err);
    }
  },

  createUser: async function (userInput, accountId, role) {
    try {
      let userObj = new Users({
        accountId: accountId,
        name: userInput.name,
        email: userInput.email,
        encryptedPassword: userInput.password,
        role: role,
        createdTimestamp: Date.now(),
        lastUpdatedTimestamp: Date.now(),
      });

      let newUser = await userObj.save();

      return { id: newUser._id.toString(), usedId: newUser._id.toString(), ...JSON.parse(JSON.stringify(newUser)) };
    } catch (err) {
      console.log("createUser error : ", err);
    }
  },

  createAccount: async function (name, email) {
    try {
      let accountObj = new Accounts({
        name: name,
        email: email,
        createdTimestamp: Date.now(),
        lastUpdatedTimestamp: Date.now(),
      });

      let newAccount = await accountObj.save();

      return newAccount._id.toString();
    } catch (err) {
      console.log("createAccount error : ", err);
    }
  },

  signInUserService: async function (signInUserInput) {
    try {
      let email = signInUserInput.email;
      let password = signInUserInput.password;

      let userData = await Users.findOne({ email: email });

      if (!userData) {
        return {
          code: 400,
          msg: {
            code: 400,
            message: "email does not exist",
          },
        };
      }

      let rightPassword = userData.encryptedPassword;

      // TODO(Kishor): decrypt the password
      if (password != rightPassword) {
        return {
          code: 404,
          msg: { code: 404, message: "authentication failure, please try again" },
        };
      }

      // Give new tokens
      let accessToken = await authServices.generateAccessToken(userData._id.toString(), userData.email, userData.accountId);

      let refreshToken = await authServices.generateRefreshToken(userData._id.toString(), userData.email, userData.accountId);

      let msg = {
        userId: userData._id.toString(),
        accessToken: accessToken,
        refreshToken: refreshToken,
        tokenExpirationTime: global.jwtTokenExpirationTime,
        accountId: userData.accountId,
      };

      return {
        code: 200,
        msg: msg,
      };
    } catch (err) {
      console.log("signInUser services error : ", err);
    }
  },

  inviteUserService: async function (req, inviteUserInput) {
    try {
      let accountId = req.reqParams.accountId;

      let newUser = await module.exports.createUser(inviteUserInput, accountId, "member");

      let inviteUserResponse = {
        email: newUser.email,
        password: inviteUserInput.password,
      };

      return { code: 200, msg: inviteUserResponse };
    } catch (err) {
      console.log("inviteUserService error : ", err);
    }
  },

  updateUserService: async function (userId, updateUserInput) {
    try {
      let updatedUser = await Users.findByIdAndUpdate(userId, updateUserInput, { new: true });
      let updatedUserResponse = {
        id: updatedUser._id.toString(),
        ...JSON.parse(JSON.stringify(updatedUser)),
      };
      console.log("updatedUserResponse : ", updatedUserResponse);

      return { code: 200, msg: updatedUserResponse };
    } catch (err) {
      console.log("inviteUserService error : ", err);
    }
  },

  deleteUserService: async function (userId) {
    try {
      let deletedUser = await Users.findByIdAndDelete(userId);
      console.log("deletedUser : ", deletedUser);

      return { code: 200, msg: "success" };
    } catch (err) {
      console.log("deleteUserService error : ", err);
    }
  },

  getAllUsersService: async function (accountId, queryParams) {
    try {
      let usersList = [];
      let users = await Users.find({ accountId: accountId });

      for (let i = 0; i < users.length; i++) {
        usersList.push({ id: users[i]._id.toString(), ...JSON.parse(JSON.stringify(users[i])) });
      }

      return { code: 200, msg: usersList };
    } catch (err) {
      console.log("getAllUsersService error : ", err);
    }
  },

  getUserByIdService: async function (userId) {
    try {
      let userData = await Users.findById(userId);
      let userDataResponse = {
        id: userData._id.toString(),
        ...JSON.parse(JSON.stringify(userData)),
      };
      console.log("userDataResponse : ", userDataResponse);

      return { code: 200, msg: userDataResponse };
    } catch (err) {
      console.log("getUserByIdService error : ", err);
    }
  },

  getNewTokens: async function (refereshTokenInput) {
    try {
      let userData = await authServices.verifyRefreshToken(refereshTokenInput.refreshToken);

      if (!userData) {
        return {
          code: 400,
          msg: "what why where",
        };
      }

      let accessToken = await authServices.generateAccessToken(userData.userId, userData.userEmail, userData.accountId);

      let refreshToken = await authServices.generateRefreshToken(userData.userId, userData.userEmail, userData.accountId);

      let msg = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        tokenExpirationTime: global.jwtTokenExpirationTime,
      };

      return {
        code: 200,
        msg: msg,
      };
    } catch (err) {
      console.log("signInUser services error : ", err);
      return {
        code: 500,
        msg: "Internal error message, please contact developers",
      };
    }
  },
};
