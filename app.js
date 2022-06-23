require("dotenv/config");

require("./db");

const express = require("express");
const { join } = require('path')
const { find } = require('./models/User.model')

const hbs = require("hbs");
const app = express();
app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))


require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "spotify_app";

app.locals.appTitle = `${capitalized(projectName)}`;


const index = require("./routes/index.routes");
app.use("/", index);


require("./error-handling")(app);

module.exports = app;
