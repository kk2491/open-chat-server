"use strict";

const express = require("express");
const router = express.Router();

router.use("/users", require("./users/routes"));

router.use("/groups", require("./groups/routes"));

router.use("/groups/:groupId/messages", require("./messages/routes"));

module.exports = router;
