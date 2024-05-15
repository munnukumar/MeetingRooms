const Meeting = require('../models/meetingModel');
const RoomData = require('../models/meetingRoom')

exports.scheduleMeeting =  (req, res) => {
   
    const name = req.body.name;
    const email = req.body.email;
    const meetingLink = req.body.meetingLink;
    const mettingRoomId = req.body.mettingRoomId;

    Meeting.create({
        name: name,
        email: email,
        meetingLink: meetingLink,
        meetingRoomId: mettingRoomId
    })
        .then(_result => {
            console.log("Added successfully!!")
            res.json(_result)

        })
        .catch(err => {
            console.log(err);
        })
};

exports.getMeeting = (req, res) => {
    Meeting.findAll()
        .then(metting => {
            res.json(metting)
        })
        .catch(err => {
            console.error('Error scheduling meeting: ' + err);
            res.status(500).send('Error scheduling meeting');
        })
}

exports.deleteMeeting = (req, res) => {
    const id = req.params.id;
    Meeting.findByPk(id)
        .then(result => {
            RoomData.findByPk(result.meetingRoomId)
            .then(data =>{
                RoomData.update({ seats:  data.seats + 1 }, { where: {id: data.id} })
            })
            result.destroy();
            res.json(result);
        })
        .catch(err => console.log(err));
};