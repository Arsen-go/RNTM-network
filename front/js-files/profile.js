window.onload = () => {
    getAllPost();
};

function getAllPost() {
    fetch("/getUserAllPost", {
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
            obj.result.forEach((post) => {
                postBody(post);
            });
        });
}

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
        <button onclick="deletePost(this)" style="margin-left: 70%, position: absolute" id="${post._id}delete" type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-trash"></span> Delete 
        </button>
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
                <a href="#" title="" class="showmore underline">more comments</a></li>
                <li class="post-comment">
                    <div class="comet-avatar">
                    <img src="images/resources/${myProfilePhoto}" alt="">
                     </div>
                    <div class="post-comt-box">
                     <form id="${post._id}" onsubmit="writeComment(this); return false">
                      <textarea id="${post._id}text" placeholder="Post your comment"></textarea>
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

function deletePost(tag) {
    fetch("/deletePost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ postId: tag.id.slice(0,24) }),
    })
        .then((res) => {
            return res.json();
        })
        .then((obj) => {
            document.getElementById(`${obj.postId}`).remove()
        });
} 