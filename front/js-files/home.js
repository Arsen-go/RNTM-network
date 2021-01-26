/* eslint-disable */
window.onload = () => {
  getAllPost();
  myPageInfo();
  addFriendList();
  getAllLikesViewsDislikesCommentsLength();
};

function addFriendList() {
  fetch("/home/addFriendList", {
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
      obj.result.forEach((element) => {
        let ul = document.getElementById("addFriendList");

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
}

let myProfilePhoto;
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
      console.log("home", obj.photo);
      let image = (document.getElementById(
        "myProfilePhoto"
      ).src = `/images/resources/${obj.photo}`);
      let rimg = document.getElementById("rigthCornerUserImg");
      rimg.src = `/images/resources/${obj.photo}`;
      rimg.style.width = "35px";
      imguser.src = `/images/resources/${obj.photo}`;
      document.getElementById("myName").innerHTML = obj.name;
      document.getElementById("messageCount").innerHTML = obj.messagesLength;
      document.getElementById("friendCount").innerHTML = obj.friendsLength;

      myProfilePhoto = obj.photo;
    });
}

function getAllPost() {
  fetch("/getHomePagePost", {
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
      obj.result.forEach((post) => {
        postBody(post);
      });
    });
}

function addFriend(tag) {
  alert("still not defined");
}

function sendPost() {
  if (!postTextInput.value && !postPhoto.value) {
    postInfo.innerHTML = "Your post is empty!";
    return;
  }
  const fileInput = document.querySelector("#postPhoto");
  const formData = new FormData();
  formData.append("userId", localStorage.getItem("userId"));

  if (postTextInput.value) {
    formData.append("text", postTextInput.value);
  }

  if (postPhoto.value) {
    formData.append("file", fileInput.files[0]);
    postPhoto.value = "";
  }

  fetch("/post", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((obj) => {
      postBody(obj.result, "firstChild");
    });
}

function addLike(tag) {
  let likeId = tag.id.slice(0, 24);
  socket.emit("addPostLike", { id: likeId });
}

socket.on("likeLength", (data) => {
  document.getElementById(`${data.post._id}count`).innerHTML =
    data.post.like + 1;
});

function postBody(post, firstChild) {
  let contain = document.getElementById("loadMore");
  let postArea = document.createElement("div");
  let image = "";
  let postText = "";

  let id = `id=${post._id}`;

  if (post.text) {
    postText = post.text;
  }
  if (post.author.profilePhotos) {
    image = `
        <figure>
        <img src="images/resources/${post.author.profilePhotos}" alt="">
        </figure>`;
  }
  let userName = `
    <div class="friend-name">
        <ins><a href="/profile" title="">${post.author.name}</a></ins>
        <span>published: ${post.createdAt}</span>
    </div>
    `;
  let postImage = "";
  if (post.image) {
    postImage = `
        <img src="images/resources/${post.image}" alt="">
        `;
  }
  let comment = `
        <li>
          <span class="comment" data-toggle="tooltip" title="Comments">
                <i class="fa fa-comments-o"></i>
                   <ins>${post.comment.length}</ins>
          </span>
        </li>
        `;
  let like = `
    <li>
        <span class="like" data-toggle="tooltip" title="like">
            <i id="${post._id}like" onclick="addLike(this)" class="ti-heart"></i>
             <ins id="${post._id}count">${post.like}</ins>
         </span>
    </li>
    `;
  let view = `
    <li>
      <span class="views" data-toggle="tooltip" title="views">
        <i class="fa fa-eye"></i>
        <ins id="${post._id}viewCount">${post.view}</ins>
      </span>
    </li>
    `;
  let dislike = `
    <li>
      <span class="dislike" data-toggle="tooltip" title="dislike">
        <i id="${post._id}dislike" onclick="dislike(this)" class="ti-heart-broken"></i>
        <ins id="${post._id}dislikeCount">${post.dislike}</ins>
      </span>
    </li>
    `;
  postArea.innerHTML = `
    <div class="central-meta item" >
    <div ${id} onclick="view(this)"  class="user-post">
        <div class="friend-info">
            ${image}
            ${userName}
            <div class="post-meta">
            ${postImage}
            <div class="we-video-info">
                    <ul>
                        ${view}
                        ${comment}
                        ${like}
                        ${dislike}
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
																${postText}
															</p>
        </div>
        ${commentArea(post)}`;
  if (firstChild === "firstChild") {
    contain.insertBefore(postArea, contain.firstChild);
  } else {
    contain.insertBefore(postArea, contain.firstChild);
  }
}

function commentArea(post) {
  let comment = `
    <div class="coment-area" style="overflow:auto;max-height:400px">
													<ul id="${post._id}conntainer" class="we-comet">
														
														${allPostComments(post)}
														<li>
															<a href="#" title="" class="showmore underline">more
																comments</a>
														</li>
														<li class="post-comment">
															<div class="comet-avatar">
																<img src="images/resources/${myProfilePhoto}" alt="">
															</div>
															<div class="post-comt-box">
																<form id="${post._id}" onsubmit="writeComment(this); return false">
																	<textarea id="${post._id}text"
																		placeholder="Post your comment"></textarea>
                                  <button style="color: silver" >Send</button>
                                  
																</form>
															</div>
														</li>
													</ul>
												</div>
											</div>
                    </div> 
                                        
    `;
  return comment;
}

function allPostComments(post) {
  let zut = "";
  post.comment.forEach((comment) => {
    let li = document.createElement("li");
    li.innerHTML = `
  <div class="comet-avatar">
    <img src="images/resources/${comment.author.profilePhotos}" alt="">
  </div>
  <div class="we-comment">
    <div class="coment-head">
      <h5><a href="time-line.html" title="">${comment.author.name}</a></h5>
      <span>${comment.createdAt}</span>
      <a class="we-reply" href="#" title="Reply"><i
          class="fa fa-reply"></i></a>
    </div>
    <p>${comment.commentText}</p>
  </div>
  `;
    zut += `${li.innerHTML}<br>`;
  });

  return zut;
}

function writeComment(tag) {
  if (!tag[0].value.length) {
    return;
  }

  let commentObj = {
    postId: tag.id,
    commentWriter: localStorage.getItem("userId"),
    commentText: tag[0].value,
  };
  socket.emit("newComment", commentObj);
  tag[0].value = "";
}

socket.on("newComment", (data) => {
  commentAddedBody(data);
});

function commentAddedBody(data) {
  let conntainer = document.getElementById(`${data.post}conntainer`);
  console.log("comm", conntainer);

  let comment = document.createElement("li");
  comment.innerHTML = `
  <div class="comet-avatar">
    <img src="images/resources/${data.author.profilePhotos}" alt="">
  </div>
  <div class="we-comment">
    <div class="coment-head">
      <h5><a href="time-line.html" title="">${data.author.name}</a></h5>
      <span>${data.createdAt}</span>
      <a class="we-reply" href="#" title="Reply"><i
          class="fa fa-reply"></i></a>
    </div>
    <p>${data.commentText}</p>
  </div>
  `;
  // if (firstChild === "firstChild") {
  //   contain.insertBefore(post, contain.firstChild);
  // } else {
  conntainer.insertBefore(comment, conntainer.firstChild);
  // }
}

function view(tag) {
  socket.emit("view", { postId: tag.id });
}

socket.on("viewLength", (data) => {
  document.getElementById(`${data.post._id}viewCount`).innerHTML =
    data.post.view + 1;
});

function dislike(tag) {
  let dislikeId = tag.id.slice(0, 24);
  socket.emit("dislike", { postId: dislikeId });
}

socket.on("dislikeLength", (data) => {
  document.getElementById(`${data.post._id}dislikeCount`).innerHTML =
    data.post.dislike + 1;
});

function getAllLikesViewsDislikesCommentsLength() {
  fetch("/home/likesDislikesViewsComments", {
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
      let lengthLike = 0;
      let lengthView = 0;
      let lengthDislike = 0;
      let commentLength = 0;
      obj.result.forEach((data) => {
        lengthLike += data.like;
        lengthView += data.view;
        lengthDislike += data.dislike;
        commentLength += data.comment.length;
      });
      allLikes.innerHTML = `${lengthLike}<i class="ti-heart">` ;
      allViews.innerHTML = `${lengthView}<i class="ti-eye"></i>` ;
      allDislikes.innerHTML = `${lengthDislike}<i style="color: red;" class="ti-heart-broken"></i>` ;
      allCommentsLength.innerHTML = `${commentLength}<i class="fa fa-comments-o"></i>`
    });
}
