const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const database = require("./config/database");
const meetingRoomRoutes = require("./routes/meetingRoutes");
const Meeting = require("./models/meetingModel")
const RoomData = require("./models/meetingRoom")

const roomRoutes = require("./routes/roomData")

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) =>{
    // console.log("*******",req.body.boxnumber)
    const roomId = req.body.boxnumber
    RoomData.findByPk(roomId)
        .then(meetingRoom =>{
            req.meetingRoom = meetingRoom;
            next();
        })
        .catch(err =>{
            console.log(err)
        })

        
})

app.use('/metting', meetingRoomRoutes);
app.use('/room', roomRoutes);

Meeting.belongsTo(RoomData, { constraints: true, onDelete: 'CASCADE' });
// RoomData.belongsTo(Meeting)


database
    // .sync({ force: true })
    .sync()
    .then(result => {
        return RoomData.findByPk(1)
    })
    .then(meeting =>{
        if(!meeting){
            return RoomData.create({seats: 4})
        }
        return meeting;
    })
    .then(res => {
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        })
    })
    .catch(err => console.log(err))
