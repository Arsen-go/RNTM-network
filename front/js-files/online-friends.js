// /* eslint-disable */
// const socket = io.connect('http://localhost:3000');

const messageText = document.getElementById('messageText')
const messageUl = document.querySelector('#messageUl')

let writeToUser = null;
function writeWhom(whom) {
    writeToUser = whom.id;
    socket.emit('openChat', localStorage.getItem("userId"))
}

function newUserConnected() {
    socket.emit('newUser', localStorage.getItem("userId"))
}
newUserConnected()

function sendMsg(e) {
    e.preventDefault()
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
    let chatBox = document.getElementById("chatBox");
    chatBox.classList.add('show');
    let name = document.getElementById('chatUserName')
    name.innerHTML = `${setUser.name}`;
})

socket.on('message', ({ user, data }) => {
    console.log(user);
    outputMessage(user, data)
})

function outputMessage(user, msg) {
    let userBrowser = localStorage.getItem('userId')
    if (userBrowser === msg.from) {
        let p = document.createElement('p')
        p.innerHTML = user.name
        let li = document.createElement('li')
        let span = document.createElement('span')
        span.className = 'chat-message-item'
        span.innerHTML = msg.text
        li.className = 'me'
        li.append(span)
        messageUl.append(p)
        messageUl.append(li)
        messageText.value = msg.text
        messageText.focus()
    } else {
        let p = document.createElement('p')
        p.innerHTML = user.name
        let li = document.createElement('li')
        let span = document.createElement('span')
        span.className = 'chat-message-item'
        span.innerHTML = msg.text
        li.className = 'you'
        li.append(span)
        messageUl.append(p)
        messageUl.append(li)
        messageText.value = msg.text
        messageText.focus()
    }
}

function outputOnlineUsers(data) {
    let peopleList = document.getElementById("peopleList");
    peopleList.innerHTML = '';
    data.forEach(elem => {
        let li = document.createElement("li");
        li.className = "friend";
        li.setAttribute("onclick", "writeWhom(this)")
        li.id = `${elem._id}`;
        li.innerHTML = `${elem.name}`;
        peopleList.appendChild(li);
    })
    // for (let elem of data) {
    //     elem.addEventListener('click', () => {
    //         let userid = elem.id;
    //         socket.emit('openChat', userid)
    //     })
    // }
}

function logout() {
    alert('Log out')
    let userId = localStorage.getItem('userId')
    socket.emit('Offline', userId)
}
