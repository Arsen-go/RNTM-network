const activeFriendUl = document.getElementById('people-list')
const Logout = document.querySelector('#Logout')

const socket = io()

socket.on('join',(data)=>{
    outputOnlineUsers(data)
})
let userId  = localStorage.getItem('userId')

socket.on('openChat',(user)=>{
    console.log(user)
})

async function outputOnlineUsers(data) {
    activeFriendUl.innerHTML = `${data.map(user=>`<li class='friend' id=${user._id}>${user.name}</li>`).join('')}`
   for (let elem of activeFriendUl.childNodes) {
       console.log(elem)
      elem.addEventListener('click',()=>{
          let userId = elem.id
        socket.emit('openChat',userId)
      })
   }
}

 console.log(Logout)
 Logout.addEventListener('click',(e)=>{
    alert('Log out')
socket.emit('Offline',userId)
 })
