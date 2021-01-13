const FriendRequestButton = document.getElementById('FriendRequestButton')
const FriendRequestUl = document.getElementById('FriendRequest')
const socket = io()

FriendRequestButton.addEventListener('click',()=>{
    fetch('/friendRequest',{
        method: 'POST',
        headers: {
            'Accept':'application/json'
        }
    })
    .then(res=>res.json())
    .then(async data=>{
        let {FriendRequestList} = data
        console.log(FriendRequestList.friendRequest)
       
     await outputFriendRequest(FriendRequestList)
        
       // console.log(FriendRequestList)
    }).catch(err=>{
        console.log(err)
    })
})

 function outputFriendRequest(FriendRequestList) {
    FriendRequestList.friendRequest.map(user=>{
        let li = document.createElement('li')
        let divContainer = document.createElement('div')
        divContainer.className = 'nearly-pepls'
        //user i nkari mas
        let figure = document.createElement('figure')
        let a = document.createElement('a')
        let img = document.createElement('img')
        img.src = 'images/resources/nearly5.jpg' 
        a.append(img)
        figure.append(a)
        divContainer.append(figure)
        li.append(divContainer)
        FriendRequestUl.append(li)

        // user i anun u Friend request i knopkeq@

        let usersDiv = document.createElement('div')
        usersDiv.className = 'pepl-info'
        let H4 = document.createElement('h4')

        // user i anuni vra vor smenq gna ira ej
        let RenderUserPage = document.createElement('a') 
        RenderUserPage.innerHTML = user.name
        H4.append(RenderUserPage)
        usersDiv.append(H4)

        //let attr = document.createAttribute('data-ripple')
        let DeleteRequest = document.createElement('a')
        DeleteRequest.className = 'add-butn more-action'
        DeleteRequest.setAttribute('name','Delete')
        //DeleteRequest.setAttributeNode(attr)
        DeleteRequest.innerHTML = 'delete Request'
        DeleteRequest.id = user._id
        let ConfirmRequest = document.createElement('a')
        ConfirmRequest.className = 'add-butn'
        ConfirmRequest.setAttribute('name','Confirm')
        ConfirmRequest.innerHTML = 'Confirm'
        ConfirmRequest.id = user._id
        //ConfirmRequest.setAttributeNode(attr)

        usersDiv.append(DeleteRequest)
        usersDiv.append(ConfirmRequest)
        divContainer.append(usersDiv)
       })
       ClickDeleteOrConfirm(FriendRequestList)
}
function ClickDeleteOrConfirm(FriendRequestList) {
   
    const Delete = document.getElementsByName('Delete') 
    const Confirm = document.getElementsByName('Confirm') 
   
    for (let confirmButton of Confirm) {
        confirmButton.addEventListener('click',()=>{
         //console.log(FriendRequestList)
        
         fetch('/ConfirmFrienqRequest',{
             method:"POST",
             headers: {
                 'content-type':'application/json'
             },
             body: JSON.stringify({
                 from: localStorage.getItem('userId'),
                 to: confirmButton.id
             })
          }).then(res=>res.json())
           .then(data=>{
               if (data.message) {
                   alert(data.message)
               }
           })
        })
    }
}
/* esi DOM i mas@ karch grelu dzever chashxatec ete karas nenc ara 
 esi ashxati senc code@ aveli karcha u chisht
*/
 // FriendRequestUl.innerHTML =  `${FriendRequestList.friendRequest.map(user => {
        //   `<li >
        //     <figure><img src="images/resources/friend-avatar3.jpg" alt=""></figure>
        //     <div class="friend-meta">
        //         <h4><a href="time-line.html" title=""></a></h4>
        //         <a href="#" title="" class="add-butn more-action" data-ripple="">delete Request</a>
        //         <a href="#" title="" class="add-butn" data-ripple="">Confirm</a>
        //     </div>
        // </li>`
        //     }).join('')}`


