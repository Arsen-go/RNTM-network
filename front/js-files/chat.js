/* eslint-disable */
let socket = io();
let chatWith = null;
window.onload = () => {
    allUsers();

}

function allUsers() {
    fetch("/getAllUsers", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(),
    })
        .then((res) => {
            return res.json();
        })
        .then((obj) => {
            createMessangerUser(obj.arrayOfUsers);
        });
}

function createMessangerUser(data) {
    data.forEach(element => {
        if (localStorage.getItem("userId") !== element._id) {
            let ul = document.getElementById("allUsers")

            let li = document.createElement("li");

            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figureSpan = document.createElement("span");
            figureSpan.className = "status f-online"
            figure.appendChild(img);
            figure.appendChild(figureSpan);

            let div = document.createElement("div");
            div.setAttribute("class", "people-name");
            let spanDiv = document.createElement("span");
            spanDiv.setAttribute("onclick", "openChat(this)");
            spanDiv.setAttribute("name", `${element.name}`);
            spanDiv.setAttribute("id", `${element._id}`)
            spanDiv.appendChild(document.createTextNode(element.name))
            div.appendChild(spanDiv)
            li.appendChild(figure);
            li.appendChild(div);

            ul.append(li);
        }

    });
}

function openChat(userTag) {
    chatWith = userTag.getAttribute('id');
    let from = localStorage.getItem("userId");
    socket.emit("openChatWithUser", { from, chatWith });
    if (document.getElementById("hDiv").childElementCount > 1) {
        removeAllChildNodes();
    }
    let a = document.createElement("a");
    a.id = "clear";
    a.value = chatWith;
    a.setAttribute("onclick", "clearMessages()");
    a.setAttribute("class", "btn btn-info btn-lg");
    let spana = document.createElement("span");
    spana.className = "glyphicon glyphicon-log-out";
    a.innerHTML = "Delete";
    a.appendChild(spana);
    a.setAttribute("style", "margin-left:200px;")
    let div = document.createElement("div");
    div.class = "conversation-head";
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = `images/resources/friend-avatar.jpg`;
    figure.appendChild(img);
    figure.appendChild(a);
    let span = document.createElement("span");
    span.innerHTML = `${userTag.getAttribute('name')} <i>Online</i>`;
    div.appendChild(figure);
    div.appendChild(span);
    let headDiv = document.getElementById("hDiv")
    headDiv.prepend(div)
}

function removeAllChildNodes() {
    const container = document.querySelector('#hDiv');
    document.getElementById("messageContainer").innerHTML = "";
    let count = document.getElementById("hDiv").childElementCount
    while (count !== 1) {
        container.removeChild(container.firstChild);
        --count;
    }
}

function sendMsg(e) {
    e.preventDefault();
    let obj = {
        from: localStorage.getItem("userId"),
        to: chatWith,
        text: document.getElementById("msgTxt").value,
    }
    document.getElementById("msgTxt").value = "";
    if (chatWith === null || obj.text.length === 0) {
        let info = document.getElementById("info");
        info.innerHTML = "Choose anyone that you want to write";

    } else {
        socket.emit('msgUser', obj);
    }

}

function clearMessages() {
    alert("esi hly serveric chi jnjum sarqac chi liqy baner piti hashvi arnenq es alerty chat.js-i 118-toxuma")
    // let clearTag = document.getElementById("clear")
    // let obj = {
    //     from: localStorage.getItem("userId"),
    //     to
    // }
    // socket.emit("deleteUserMsg",clearTag.value);
    //removeAllChildNodes();
}

socket.on("msgUserBack", (data) => {
    createMsgTag(data);
})

socket.on("openChatWithUserBack", (msgArray) => {
    msgArray.forEach(element => {
        createMsgTag(element);//kisat
    })
})

function createMsgTag(msg) {
    let ul = document.getElementById("messageContainer");
    let li = document.createElement("li");
    let browserUser = localStorage.getItem("userId");
    let img = document.createElement("img");

    if (browserUser === msg.from) {
        li.className = "me";
        img.src = "images/resources/friend-avatar.jpg";
    } else {
        li.className = "you";
        img.src = "images/resources/userlist-1.jpg";
    }
    let figure = document.createElement("figure");

    let p = document.createElement("p");
    p.innerHTML = msg.text;
    figure.appendChild(img);
    li.appendChild(figure);
    li.appendChild(p);
    ul.appendChild(li);
}
