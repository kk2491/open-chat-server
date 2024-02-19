"use strict";

const express = require("express");
const router = express.Router({ mergeParams: true });

const { verifyAccessToken } = require("../../../middleware/auth");
const messageController = require("./controller");

router.post("/", verifyAccessToken, messageController.createMessageInGroup);

router.get("/", verifyAccessToken, messageController.getMessagesInGroup);

// router.patch("/:groupId/messages/:messageId", verifyAccessToken, messageController.reactMessageById);

module.exports = router;
