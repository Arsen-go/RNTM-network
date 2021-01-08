/* eslint-disable */
const activeFriendUl = document.getElementById('people-list')
const Logout = document.querySelector('#Logout')

const chatBox = document.querySelector('.chat-box')
const chatUserName = document.querySelector('.chatUserName')
const chatMessage= document.querySelector('.text-box')
const messageText = document.getElementById('messageText')
const messageUl = document.querySelector('#messageUl')



let userId = localStorage.getItem('userId')

const socket = io()
/*Gevorg i asac methodn erb vor user@ connect lini server poxancenq userId in */
 function newUserConnected() {
    socket.emit('newUser',userId)
   }
   newUserConnected()

   /* erb vor submit es anum gract namak@ */
   chatMessage.addEventListener('submit',(e)=>{
    e.preventDefault()
    let msg = messageText.value
    let obj = {
        userId,
        msg
    }
   socket.emit('message',obj)
})

socket.on('onlineUsers', (data) => {
  outputOnlineUsers(data)
})
/* erb vor click es anum online user i vra */
socket.on('openChat', ({setUser,userId}) => {
   chatBox.classList.add('show')
    chatUserName.innerHTML = setUser.name
    socket.on('message',({user,msg})=>{
        outputMessage(user,msg,userId)
    })
})

function outputMessage(user,msg,firendId){
 let userId = localStorage.getItem('userId')
 if (userId != firendId) {
     let p = document.createElement('p')
     p.innerHTML = user.name
    let li = document.createElement('li')
    let span  = document.createElement('span')
    span.className = 'chat-message-item'
    span.innerHTML = msg
    li.className = 'you'
    li.append(span)
    messageUl.append(p)
    messageUl.append(li)
    messageText.value = ''
    messageText.focus()
 }
}
function outputOnlineUsers(data) {
    activeFriendUl.innerHTML = ''
    activeFriendUl.innerHTML = `${data.map(user => `<li class='friend' id=${user._id}>${user.name}</li>`).join('')}`
    for (let elem of activeFriendUl.childNodes) {
       elem.addEventListener('click', () => {
            let userid = elem.id;
            socket.emit('openChat', userid)
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

