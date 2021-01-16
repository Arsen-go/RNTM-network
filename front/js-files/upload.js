window.onload = () => {
    fa()

}
const form = document.getElementById("edit-phto")

let userId = localStorage.getItem('userId')

function f() {
    const fileField = document.querySelectorAll('input[type="file"]')[1];
    const formData = new FormData();
    console.log('fileField', fileField);
    formData.append('edit', fileField.files[0]);
    formData.append("userId", userId)
    console.log(formData.get("edit"));
    console.log('formData', formData);
    fetch('/editProfileImg', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            return response.json()
        })
        .then(result => {
            console.log("result", result)
            img.src = `/images/resources/${result}`
            alert("a")
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

fa()
function fa() {
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
            console.log("result", result.imageName.profilePhotos)
            const img = document.querySelector("#img")
            img.src = `/images/resources/${result.imageName.profilePhotos}`
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}