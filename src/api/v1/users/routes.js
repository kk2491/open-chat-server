"use strict";

const express = require("express");
const router = express.Router({ mergeParams: true });

const { verifyAccessToken } = require("../../../middleware/auth");
const userController = require("./controller");

router.post("/signup", userController.signUpUser);

router.post("/signin", userController.signInUser);

router.post("/invite", verifyAccessToken, userController.inviteUser);

router.post("/signout", verifyAccessToken, userController.signOutUser);

router.patch("/:userId", verifyAccessToken, userController.updateUser);

router.delete("/:userId", verifyAccessToken, userController.deleteUser);

router.get("/", verifyAccessToken, userController.getAllUsers);

router.get("/:userId", verifyAccessToken, userController.getUserById);

router.post("/token", userController.refreshToken);

module.exports = router;
