const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { json } = require("body-parser");
const path = require("path"); // Import the path module

// ROUTES Section
const routes = require("./routes/routes");

require("dotenv").config({ path: '.env' });

app.use(cors({ origin: 'https://codegenius-1ab16d917280.herokuapp.com/' }));
// app.use(cors({ origin: 'http://localhost:3000' }));
// https://codegenius-1ab16d917280.herokuapp.com/
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
        dbName: "dv200_term4_group2_owi_forum" // Collection Name
    })
    .then(console.log('Connected to Database'))
    .catch(err => console.log("No Connection. Error:" + err));

// Serve the client-side build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    // For any route other than the API routes, serve the React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// PORT section
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Listening to Port: ${PORT}`) });
