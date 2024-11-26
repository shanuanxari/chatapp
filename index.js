
const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")

require('dotenv').config()
require("./db_connect")
const Router = require("./routes/index")

app.set("view engine", "hbs")
app.use(express.static("views/public"))
hbs.registerPartials(path.join(__dirname, "./views/partials"))

app.use("", Router)

let PORT=process.env.PORT || 8000
app.listen(PORT, console.log(`Server is Running at http://localhost:${PORT}`))
