fetch("/home/myPageInfo", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },

    body: JSON.stringify({ userId: localStorage.getItem("userId") }),
}).then((res) => {
    return res.json();
})
    .then((obj) => {
        document.getElementById("myProfilePhoto").src = `/images/resources/${obj.photo}`;
        let rimg = document.getElementById("rigthCornerUserImg");
        rimg.src = `/images/resources/${obj.photo}`;
        rimg.style.width = "35px";
        document.getElementById("myName").innerHTML = obj.name;
        document.getElementById("messageCount").innerHTML = obj.messagesLength;
        document.getElementById("friendCount").innerHTML = obj.friendsLength;
    });

fetch("/home/addFriendList", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },

    body: JSON.stringify({ userId: localStorage.getItem("userId") }),
}).then((res) => {
    return res.json();
})
    .then((obj) => {
        obj.result.forEach(element => {
            let ul = document.getElementById("addFriendList")

            let li = document.createElement("div");
            let p = document.createElement("p");
            p.innerHTML = `Add ${element.name} to your friend`;
            p.setAttribute("onclick", "addFriend(this)");
            p.id = element._id;
            let figure = document.createElement("figure");
            
            let img = document.createElement("img");
            img.src = `/images/resources/${element.profilePhotos}`;
            img.style.width = "50px";
            figure.appendChild(img);
            figure.appendChild(p);
            
            li.appendChild(figure);
            ul.appendChild(li);
        });
    });

function addFriend(tag) {
    alert("still not defined");
}
