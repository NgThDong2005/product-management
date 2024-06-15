const express = require("express");
require('dotenv').config();
const bodyParser = require('body-parser');

const database = require("./config/database");
database.connect();

const routeAdmin =  require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");
const systemConfig = require("./config/system");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.set("views", "./views"); // thêm thư mục views
app.set("view engine", "pug"); // định nghĩa template engine là pug

app.use(express.static('public'));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin.index(app);
routeClient.index(app);

app.listen(port, () => {
    console.log(`App listening on ${port}`); 
})