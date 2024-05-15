const RoomData = require('../models/meetingRoom');
const Meeting = require('../models/meetingModel');

exports.getRoomData = (req, res) => {
    RoomData.findAll()
        .then(room => {
            res.json(room)
        })
        .catch(err => {
            console.error('Error scheduling meeting: ' + err);
            res.status(500).send('Error scheduling meeting');
        })
}

exports.updateRoomData = (req, res) => {
        id = req.body.updateData.boxNumber;
        availableSeats = req.body.updateData.totalSeats;
        RoomData.update({ seats: availableSeats - 1 }, { where: {id:  id} })
        .then(result => {
            console.log(`${result} row(s) updated successfully.`);
            res.status(200).send(`${result} row(s) updated successfully.`);

        })
        .catch(err => {
            console.error("Error occurred:", err);
            res.status(500).send("Error occurred while updating seats.");
        }); 
};
