const Meeting = require('../models/meetingModel');

exports.scheduleMeeting = async (req, res) => {
    try {
        const { name, email, meetingLink  } = req.body;
        const meeting = await Meeting.create({ name, email, meetingLink });
        res.status(201).send('Meeting scheduled successfully');
    } catch (err) {
        console.error('Error scheduling meeting: ' + err);
        res.status(500).send('Error scheduling meeting');
    }
};

exports.getMeeting = async(req, res) =>{
        Meeting.findAll()
            .then(metting =>{
                res.json(metting)
            })
            .catch (err => {
                console.error('Error scheduling meeting: ' + err);
                res.status(500).send('Error scheduling meeting');
            })
} 


exports.deleteMeeting = async (req, res) => {
    try {
        const id = req.params.id;
        await Meeting.destroy({
            where: {
                id: id
            }
        });
        res.status(200).send('Meeting deleted successfully');
    } catch (err) {
        console.error('Error deleting meeting: ' + err);
        res.status(500).send('Error deleting meeting');
    }
};
