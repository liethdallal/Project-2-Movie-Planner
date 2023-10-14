const { log } = require("console")
const express = require("express")
const { long } = require("webidl-conversions")
const app = express()

const port = 3000

app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port} ✅`);
})