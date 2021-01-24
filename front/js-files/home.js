/* eslint-disable */
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

function sendPost() {
    if (!postTextInput.value && !postPhoto.value) {
        postInfo.innerHTML = "Your post is empty!";
        return;
    }
    const fileInput = document.querySelector('#postPhoto');
    const formData = new FormData();
    formData.append('userId', localStorage.getItem("userId"));

    if (postTextInput.value) {
        formData.append('text', postTextInput.value);
    }

    if (postPhoto.value) {
        formData.append('file', fileInput.files[0]);
        postPhoto.value = '';
    }

    fetch("/post", {
        method: "POST",
        body: formData,
    }).then((res) => {
        return res.json();
    })
        .then((obj) => {
            console.log(obj)
            postBody(obj.result);
        })
}


function postBody(result) {
    let contain = document.getElementById("loadMore");
    let post = document.createElement("div");
    let image = ''
    if (result.author.profilePhotos) {
        image = `
        <figure>
        <img src="images/resources/${result.author.profilePhotos}" alt="">
        </figure>`
    }
    let userName = `
    <div class="friend-name">
        <ins><a href="/profile" title="">${result.author.name}</a></ins>
        <span>published: ${result.createdAt}</span>
    </div>
    `
    let postImage = '';
    if (result.image) {
        postImage = `
        <img src="images/resources/${result.image}" alt="">
        `
    }
    let comment = `
        <li>
          <span class="comment" data-toggle="tooltip" title="Comments">
                <i class="fa fa-comments-o"></i>
                   <ins>${result.comment.length}</ins>
          </span>
        </li>
        `
    let like = `
    <li>
        <span class="like" data-toggle="tooltip" title="like">
            <i class="ti-heart"></i>
             <ins>${result.like}</ins>
         </span>
    </li>
    `;
    post.innerHTML = `
    <div class="central-meta item">
    <div class="user-post">
        <div class="friend-info">
            ${image}
            ${userName}
            <div class="post-meta">
            ${postImage}
            <div class="we-video-info">
                    <ul>
                        <li>
                            <span class="views" data-toggle="tooltip"
                                title="views">
                                <i class="fa fa-eye"></i>
                                <ins>1.2k</ins>
                            </span>
                        </li>
                        ${comment}
                        ${like}
                        <li>
                            <span class="dislike" data-toggle="tooltip"
                                title="dislike">
                                <i class="ti-heart-broken"></i>
                                <ins>200</ins>
                            </span>
                        </li>
                        <li class="social-media">
                            <div class="menu">
                                <div class="btn trigger"><i
                                        class="fa fa-share-alt"></i></div>
                                <div class="rotater">
                                    <div class="btn btn-icon"><a href="#"
                                            title=""><i
                                                class="fa fa-html5"></i></a>
                                    </div>
                                </div>
                                <div class="rotater">
                                    <div class="btn btn-icon"><a href="#"
                                            title=""><i
                                                class="fa fa-facebook"></i></a>
                                    </div>
                                </div>
                                <div class="rotater">
                                    <div class="btn btn-icon"><a href="#"
                                            title=""><i
                                                class="fa fa-google-plus"></i></a>
                                    </div>
                                </div>
                                <div class="rotater">
                                    <div class="btn btn-icon"><a href="#"
                                            title=""><i
                                                class="fa fa-twitter"></i></a>
                                    </div>
                                </div>
                                <div class="rotater">
                                    <div class="btn btn-icon"><a href="#"
                                            title=""><i
                                                class="fa fa-css3"></i></a>
                                    </div>
                                </div>
                                <div class="rotater">
                                    <div class="btn btn-icon"><a href="#"
                                            title=""><i
                                                class="fa fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div class="rotater">
                                    <div class="btn btn-icon"><a href="#"
                                            title=""><i
                                                class="fa fa-dribbble"></i></a>
                                    </div>
                                </div>
                                <div class="rotater">
                                    <div class="btn btn-icon"><a href="#"
                                            title=""><i
                                                class="fa fa-pinterest"></i></a>
                                    </div>
                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
                <div class="description">

															<p>
																${result.text}
															</p>
		</div>`
    contain.insertBefore(post, contain.firstChild)
}