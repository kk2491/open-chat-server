"use strict";

const jwt = require("jsonwebtoken");

const global = require("../config/global");

const { Users } = require("../api/v1/users/schema/models");

module.exports = {
  generateAccessToken: async function (userId, userEmail, accountId) {
    try {
      console.log("======access=======");
      console.log(userId, userEmail, accountId);
      let payload = {
        userId: userId,
        userEmail: userEmail,
        accountId: accountId,
      };

      let accessToken = jwt.sign(payload, global.jwtTokenSecret, { expiresIn: `${global.jwtTokenExpirationTime}s` });
      console.log("accessToken generated : ", accessToken);

      return accessToken;
    } catch (err) {
      console.log("generateAccessToken error : ", err);
    }
  },

  generateRefreshToken: async function (userId, userEmail, accountId) {
    try {
      console.log("=====refresh========");
      console.log(userId, userEmail, accountId);

      let payload = {
        userId: userId,
        userEmail: userEmail,
        accountId: accountId,
      };

      let accessToken = jwt.sign(payload, global.jwtRefreshTokenSecret);
      console.log("refreshToken generated : ", accessToken);

      return accessToken;
    } catch (err) {
      console.log("generateAccessToken error : ", err);
    }
  },

  verifyAccessToken: async function (req, res, next) {
    try {
      let accessToken = req.headers["authorization"].split(" ")[1];

      let userData = jwt.verify(accessToken, global.jwtTokenSecret);

      if (userData) {
        console.log("acessToken userData verified : ", userData);
        let userDoc = await Users.findById(userData.userId);

        if (!userDoc) {
          res.status(400).json("failed request");
          return;
        }

        req.reqParams = {
          userId: userData.userId,
          userEmail: userData.userEmail,
          accountId: userDoc.accountId,
        };

        next();
      } else {
        res.status(400).json("failed request");
      }
    } catch (err) {
      console.log("verifyAccessToken error : ", err);
      res.status(400).json("failed request");
    }
  },

  verifyRefreshToken: async function (refreshToken) {
    try {
      let userData = jwt.verify(refreshToken, global.jwtRefreshTokenSecret);
      console.log("refreshToken userData verified : ", userData);

      return userData;
    } catch (err) {
      console.log("verifyRefreshToken error : ", err);
    }
  },
};
