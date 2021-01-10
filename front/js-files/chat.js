/* eslint-disable */
let socket = io();
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
        console.log(element.name)
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
        spanDiv.setAttribute("value", `${element._id}`);
        spanDiv.setAttribute("id", `${element.name}`)
        spanDiv.appendChild(document.createTextNode(element.name))
        div.appendChild(spanDiv)
        li.appendChild(figure);
        li.appendChild(div);

        ul.append(li);
    });
}

function openChat(userTag) {
    console.log(userTag)
    alert(document.getElementById("hDiv").childElementCount)
    if (document.getElementById("hDiv").childElementCount > 1) {
        removeAllChildNodes();
    }
    let div = document.createElement("div");
    div.class = "conversation-head";
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = `images/resources/friend-avatar.jpg`;
    figure.appendChild(img);
    let span = document.createElement("span");
    span.innerHTML = `${userTag.id} <i>Online</i>`;
    div.appendChild(figure);
    div.appendChild(span);
    let headDiv = document.getElementById("hDiv")
    headDiv.prepend(div)
}

function removeAllChildNodes() {
    const container = document.querySelector('#hDiv');
    let count = document.getElementById("hDiv").childElementCount
    while (count !== 1) {
        container.removeChild(container.firstChild);
        --count;
    }
}