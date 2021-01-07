/* eslint-disable */
const activeFriendUl = document.getElementById('people-list')
const Logout = document.querySelector('#Logout')

const socket = io()

socket.on('onlineUsers', (data) => {
    console.log(data)
    outputOnlineUsers(data)
})

socket.on('openChat', (user) => {
    console.log(user)
})

function outputOnlineUsers(data) {
    activeFriendUl.innerHTML = `${data.map(user => `<li class='friend' id=${user._id}>${user.name}</li>`).join('')}`
    for (let elem of activeFriendUl.childNodes) {
        console.log(elem)
        elem.addEventListener('click', () => {
            let userId = elem.id
            socket.emit('openChat', userId)
        })
    }
}

Logout.addEventListener('click', (err) => {
    if (err) {
        console.log("error on logOut:", err);
    }
    alert('Log out')
    let userId = localStorage.getItem('userId')
    socket.emit('Offline', userId)
    location.reload();
})
