// Function to open the popup
function openPopup(boxNumber) {
    document.getElementById("meetingPopup").style.display = "block";
    document.getElementById("meetingForm").setAttribute("data-box", boxNumber); // Set box number in data attribute
}

// Function to close the popup
function closePopup() {
    document.getElementById("meetingPopup").style.display = "none";
}

// Function to submit the meeting form
document.getElementById("meetingForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let boxNumber = document.getElementById("meetingForm").getAttribute("data-box"); // Get box number from data attribute

    const meetingDetails = {
        name: name,
        email: email,
        meetingLink: "https://google/meetinglink.com",
    }
    axios.post("http://localhost:3000/metting/schedule-meeting",
        meetingDetails,
        location.reload()
    )
        .then(res => {
            let seatsElement = document.getElementById(`seats${boxNumber}`);
            let availableSeats = parseInt(seatsElement.textContent);
            if (availableSeats > 0) {
                seatsElement.textContent = availableSeats - 1;
            }
            closePopup()
        })
        .catch(err => console.log(err))

});
document.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/metting/get-meeting")
        .then(res => {
            res.data.forEach(meeting => {
                let scheduledMeetingBox = document.createElement("div");
                scheduledMeetingBox.classList.add("meeting-box");
                scheduledMeetingBox.innerHTML = `
                        <h3>Scheduled Meeting</h3>
                        <p><strong>Name:</strong> ${meeting.name}</p>
                        <p><strong>Email:</strong> ${meeting.email}</p>
                        <p><strong>Email:</strong> ${meeting.meetingLink}</p>
                        <button class="delete-btn">Delete</button>
                    `;
                document.body.appendChild(scheduledMeetingBox);

                const deleteBtn = document.querySelector(".delete-btn");
                deleteBtn.addEventListener("click", () => {
                    axios.delete(`http://localhost:3000/metting/delete-meeting/${meeting.id}`)
                        .then(res => {
                            deleteBtn.parentNode.remove();

                            let boxNumber = document.getElementById("meetingForm").getAttribute("data-box"); // Get box number from data attribute
                            let seatsElement = document.getElementById(`seats${boxNumber}`);
                            let availableSeats = parseInt(seatsElement.textContent);
                            seatsElement.textContent = availableSeats + 1;
                            
                           
                        }).catch(err => console.log(err));
                });
            })
        })
})

