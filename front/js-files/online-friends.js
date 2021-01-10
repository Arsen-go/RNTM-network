/* eslint-disable */
const activeFriendUl = document.getElementById('people-list')
const Logout = document.querySelector('#Logout')

const chatBox = document.querySelector('.chat-box')
const chatUserName = document.querySelector('.chatUserName')
const chatMessage = document.querySelector('.text-box')
const messageText = document.getElementById('messageText')
const messageUl = document.querySelector('#messageUl')

let writeToUser = null;
function writeWhom(whom) { //es function-y drel em sax userneri vra 123-toxum onclick="writeWhom(this)"
    console.log(whom.id) //vercnuma um vra sexmela dra id-n vor 43 toxum uxarki server
    writeToUser = whom.id;
}

let userId = localStorage.getItem('userId')

const socket = io()
/*Gevorg i asac methodn erb vor user@ connect lini server poxancenq userId in */
function newUserConnected() {
    socket.emit('newUser', userId)
}
newUserConnected()

/* erb vor submit es anum gract namak@ */
// chatMessage.addEventListener('submit', (e) => {
//     e.preventDefault()
//     let msg = messageText.value
//     let obj = {
//         from: userId,
//         to: writeToUser,
//         text: msg
//     }
//     socket.emit('message', obj)
// })

function sendMsg(e) {//es function-y prosty chei uzum vorpes submit ashxater 
    e.preventDefault()//bayc voncor tarberutyun chexav karas poxes verevi qony
    let msg = messageText.value
    let obj = {
        from: userId,
        to: writeToUser,
        text: msg
    }
    socket.emit('message', obj)
}

socket.on('onlineUsers', (data) => {
    outputOnlineUsers(data);
})
/* erb vor click es anum online user i vra */
socket.on('openChat', ({ setUser, userId }) => {
    chatBox.classList.add('show')
    chatUserName.innerHTML = setUser.name

})

socket.on('message', ({ user, data }) => {
    console.log(user);
    outputMessage(user, data)
})

function outputMessage(user, msg) {
    let userBrowser = localStorage.getItem('userId')
    console.log(msg)

    if (userBrowser === msg.from) {

        let li = document.createElement("li");
        li.className = "me";
        let p = document.createElement('p')
        p.innerHTML = user.name
        let div = document.createElement('div')
        div.className = "notification-event";
        let span = document.createElement('span')
        span.className = 'chat-message-item'
        span.innerHTML = msg.text
        // div.className = 'me'
        div.append(span)
        li.append(div)
        messageUl.append(p)
        messageUl.append(li)
        messageText.value = msg.text
        messageText.focus()
    } else {
        alert("he")
        let li = document.createElement("li");
        li.className = "you";
        let p = document.createElement('p')
        p.innerHTML = user.name
        let div = document.createElement('div')
        div.className = "notification-event";
        let span = document.createElement('span')
        span.className = 'chat-message-item'
        span.innerHTML = msg.text
        div.append(span)
        li.append(div)
        messageUl.append(p)
        messageUl.append(li)
        li.setAttribute("style", "background-color: rgba(0, 0, 0, 0.4) ");
    }

    // qo gracy nerqevinna 

    //let p = document.createElement('p')
    // p.innerHTML = user.name
    // let li = document.createElement('li')
    // let span = document.createElement('span')
    // span.className = 'chat-message-item'
    // span.innerHTML = msg.text
    // li.className = 'you'
    // li.append(span)
    // messageUl.append(p)
    // messageUl.append(li)
    // messageText.value = msg.text
    // messageText.focus()
}

function outputOnlineUsers(data) {
    console.log(data)
    activeFriendUl.innerHTML = ''
    activeFriendUl.innerHTML = `${data.map(user => `<li class='friend' onclick="writeWhom(this)" id=${user._id}>${user.name}</li>`).join('')}`
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



