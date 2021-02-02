/* eslint-disable */
window.onload = () => {
    myPageInfo();
};

function myPageInfo() {
    fetch("/home/myPageInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },

        body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
        .then((res) => {
            return res.json();
        })
        .then((obj) => {
            console.log(obj)
            friendRequestListForm(obj);
            messageLength.innerHTML = obj.messagesLength;
            notificationLength.innerHTML = obj.friendRequest.length;
            friendLength.innerHTML = obj.friendsLength;
            FriendRequestCount.innerHTML = obj.friendRequest.length;
        });
}

function getFriendRequest() {
    fetch("/friendRequests", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },

        body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
        .then((res) => {
            return res.json();
        })
        .then((obj) => {
            friendRequestListForm(obj.result);
        })
}

function friendRequestListForm(data) {
    let ul = document.getElementById("FriendRzeqsuest");
    ul.innerHTML = "";
    data.friendRequest.forEach(elem => {
        let li = document.createElement("li");
        li.innerHTML = `
        <div class="nearly-pepls" id="${elem._id}">
            <figure>
                <a href="time-line.html" title=""><img src="images/resources/${elem.profilePhotos}" alt=""></a>
            </figure>
            <div class="pepl-info">
                <h4><a href="time-line.html" title="">${elem.name}</a></h4>
                <span>${elem.gender}</span>
                <a href="#" id="${elem._id}cancel" title="" onclick="cancelFriendRequest(this)" class="add-butn more-action" data-ripple="">Cancel</a>
                <a href="#" id="${elem._id}confirm" onclick="confirmFriendRequest(this)" title="" class="add-butn" data-ripple="">Confirm</a>
            </div>
        </div>
    `
        ul.append(li);
    });
}

function confirmFriendRequest(tag) {
    const requestId = tag.id.slice(0, 24);
    fetch("/confirmFriendRequest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },

        body: JSON.stringify({ userId: localStorage.getItem("userId"), requestId: requestId }),
    })
        .then((res) => {
            return res.json();
        })
        .then((obj) => {
            document.getElementById(tag.id).remove();
        });
}