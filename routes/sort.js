const express = require("express");
const router = express.Router();
const {
  asc,
  des,
  mix,
  original,
  sorted,
  logs
} = require("../controllers/sortController");
const { verifyToken } = require("../controllers/authController");

router.get("/asc", verifyToken, asc);

router.get("/des", verifyToken, des);

router.get("/mix", verifyToken, mix);

router.get("/assets/original.txt", verifyToken, original);

router.get("/assets/sorted.txt", verifyToken, sorted);

router.get("/assets/log.txt", verifyToken, logs);

module.exports = router;
