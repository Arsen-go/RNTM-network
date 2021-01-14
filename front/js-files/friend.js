/* eslint-disable */

const allUserUl = document.getElementById('followers')
const AddFriendButton = document.querySelectorAll('.friend-meta')

// const FriendRequestUl = document.getElementById('FriendRequest')
// console.log(FriendRequestUl)
fetch('/getAllUsers').then(res=>res.json())
.then(async data=>{
    await outputAllUsers(data)
 
})

 async function outputAllUsers(data){
    for (let user of data.arrayOfUsers) {
        let li = document.createElement('li')
        let h4 = document.createElement('h4')
        let a = document.createElement('a')
        li.className = "friend-meta"
        li.id = user._id
        h4.innerHTML = user.name
        li.append(h4)
        a.innerHTML = 'Add Friend' 
        a.className = 'underline' 
        li.append(a)
        allUserUl.append(li)
    }
    await sendUserIdToFriend()
}
function sendUserIdToFriend(){
    for (let addFriend of allUserUl.childNodes) {
        console.log(addFriend)
        addFriend.addEventListener('click',()=>{
            let userId = localStorage.getItem('userId')
          
          let data = {
            from: userId,
            to: addFriend.id
          }
         socket.emit('friendRequest',data) 
        })
    }
 }

 socket.on('friendRequest',()=>{
    console.log('FriendRequest@ hasav')
    window.location.href = '/friends'
  })

