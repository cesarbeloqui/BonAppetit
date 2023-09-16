const express = require("express");
const router = express.Router();
const postQualification = require("../handlers/qualificationHandler");

router.post("/", postQualification);

module.exports = router;
