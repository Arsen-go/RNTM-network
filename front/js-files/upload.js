
const form = document.getElementById("edit-phto")

let userId = localStorage.getItem('userId')
//const socket = io()
function f() {
    const fileField = document.querySelectorAll('input[type="file"]')[1];
    const formData = new FormData();
    formData.append('edit', fileField.files[0]);
    formData.append("userId", userId)
    fetch('/editProfileImg', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            return response.json()
        })
        .then(result => {
            img.src = `/images/resources/${result}`
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

fetch('/getProfilePhoto', {
    method: 'post',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    body: JSON.stringify({ userId: localStorage.getItem("userId") })
})
    .then(response => {
        return response.json()
    })
    .then(result => {
        const img = document.querySelector("#img")
        img.src = `/images/resources/${result.imageName}`;
        let rimg = document.getElementById("rigthCornerUserImg");
        rimg.src = `/images/resources/${result.imageName}`;
        rimg.style.width = "35px";
        document.getElementById("userName").innerHTML = result.userName;
    })
    .catch(error => {
        console.log('Error:', error);
    });
