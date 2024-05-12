const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const database = require("./config/database");
const meetingRoomRoutes = require("./routes/meetingRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/metting', meetingRoomRoutes);

database
    .sync()
    .then(res => {
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        })
    })
    .catch(err => console.log(err))
