const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { catchErrors } = require("../helpers/errorHelper");

router.post("/register", catchErrors(register));

router.post("/login", catchErrors(login));

module.exports = router;
