const express = require("express")

const {getStamps} = require("../controllers/stampController")

const router = express.Router()

router.get("/", getStamps)

module.exports = router