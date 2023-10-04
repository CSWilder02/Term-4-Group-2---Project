const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { json } = require("body-parser");

// ROUTES Section
const routes = require("./routes/routes")

require("dotenv").config({ path: '.env' });

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routes section
app.use(routes);

// Mongoose Connection section
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "dv200_term4_group2_owi_forum" //Collection Name
    })
    .then(console.log('Connected to Database'))
    .catch(err => console.log("No Connection. Error:" + err));

// PORT section
const PORT = process.env.PORT;
app.listen(PORT, () => { console.log(`Listening to Port: ${PORT}`) });
