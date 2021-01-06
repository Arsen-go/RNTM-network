const socket = io()

function onlineFriend() {
    socket.emit('join',)
    socket.on('onlineUsers',data=>{
        //console.log(data)
    })
}
// let user  = localStorage.getItem('userId)
module.exports = onlineFriend
