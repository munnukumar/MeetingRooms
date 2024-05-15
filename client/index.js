// Function to open the popup
function openPopup(boxNumber) {
    document.getElementById("meetingPopup").style.display = "block";
    document.getElementById("meetingForm").setAttribute("data-box", boxNumber);
}
let availableSeats;
let time;

document.addEventListener("DOMContentLoaded", () => {

roomsData()
// Function to close the popup
    function closePopup(boxNumber, seatsElement) {
        document.getElementById("meetingPopup").style.display = "none";
        updateRoomsData(boxNumber, seatsElement);
    
    }

// Function to submit the meeting form
    document.getElementById("meetingForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let boxNumber = document.getElementById("meetingForm").getAttribute("data-box");
        let seatsElement = document.getElementById(`seats${boxNumber}`);
        
        const meetingDetails = {
            name: name,
            email: email,
            meetingLink: "https://google/meetinglink.com",
            mettingRoomId: boxNumber
        }
    
        axios.post("http://localhost:3000/metting/schedule-meeting",
            meetingDetails,
            closePopup(boxNumber, seatsElement),
        )
    });

    //featching the data form server
    axios.get("http://localhost:3000/metting/get-meeting")
        .then(res => {
            res.data.forEach(meeting => {
                let scheduledMeetingBox = document.createElement("div");
                scheduledMeetingBox.classList.add("meeting-box");
                let time;
                const formData = document.querySelectorAll(".meetingRoom-box")
                for(let i=0; i<formData.length; i++){
                    if(meeting.meetingRoomId == i+1){
                        console.log(formData[i].textContent)
                        let text = formData[i].textContent;
                        const timeRegex = /\b\d{1,2}:\d{2}\s(?:AM|PM)\b/;
                        const match = text.match(timeRegex);
                        if (match) {
                            time = match[0];
                        }
                    }
                }

                scheduledMeetingBox.innerHTML = `
                        <p><strong>Hi </strong> ${meeting.name},</p>
                        <p><strong>Please join the meeting via this link <a href = ${meeting.meetingLink} >${meeting.meetingLink}</a> at ${time}</strong></p>
                        <button class="delete-btn" data-meeting-id="${meeting.id}">cancel</button>

                    `;

                document.body.appendChild(scheduledMeetingBox);
            })

            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const meetingId = btn.dataset.meetingId;
                    deleteMeeting(meetingId);
                })

            })
        })
        .catch(error => {
            console.error('Error fetching meetings:', error);
        });
})

function deleteMeeting(meetingId) {
    axios.delete(`http://localhost:3000/metting/delete-meeting/${meetingId}`)
        .then(() => {
            console.log("Meeting is cancel!!")
            window.location.reload();

        })
        .catch(error => {
            console.error('Error deleting meeting:', error);
        });
}

function roomsData() {
    axios.get("http://localhost:3000/room/get-roomData")
        .then(seatsElement => {
            const seat = document.querySelectorAll("span")
            for (let i = 0; i < seat.length; i++) {
                availableSeats = seatsElement.data[i].seats
                seat[i].innerHTML = availableSeats;
                if(seat[i].innerHTML == 0){
                    document.getElementById(`meetingBox${i+1}`).style.display = "none";
                }
            }
            
        })
        .catch(err => {
            console.log(err);
        })

    roomsDataCalled = true;

}

function updateRoomsData(boxNumber, seatsElement) {

    let totalSeats = seatsElement.textContent;
    let updateData = {
        boxNumber: boxNumber,
        totalSeats: totalSeats
    }
    axios.patch(`http://localhost:3000/room/update-roomData`, {
        updateData
    })
        .then(res => {
            availableSeats = res.data[0].seats;
            let seatsElement = document.getElementById(`seats${boxNumber}`);
            if (availableSeats > 0) {
                seatsElement.textContent = availableSeats;
            }

            window.location.reload();

        })
        .catch(err => {
            console.log(err);
        })
}

