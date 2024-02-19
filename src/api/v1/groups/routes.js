"use strict";

const express = require("express");
const router = express.Router({ mergeParams: true });

const { verifyAccessToken } = require("../../../middleware/auth");
const groupController = require("./controller");

router.post("/", verifyAccessToken, groupController.createGroup);

router.delete("/:groupId", verifyAccessToken, groupController.deleteGroup);

router.get("/", verifyAccessToken, groupController.getAllGroups);

router.get("/:groupId", verifyAccessToken, groupController.getGroupById);

// add members to the group
router.patch("/:groupId", verifyAccessToken, groupController.updateGroup);

module.exports = router;
