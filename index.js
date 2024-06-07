const express = require("express");
require('dotenv').config();

const database = require("./config/database");
database.connect();

const routeClient = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.set("views", "./views"); // thêm thư mục views
app.set("view engine", "pug"); // định nghĩa template engine là pug

routeClient.index(app);

app.listen(port, () => {
    console.log(`App listening on ${port}`); 
})