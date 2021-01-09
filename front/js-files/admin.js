window.onload = function () {
    loadUsers();
};

function loadUsers () {
    fetch("/admin/showUsers", {
      method: "get",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
          console.log(data.arrayOfUsers);
        createTagOfUser(data.arrayOfUsers);
      });
  };
  
 function createTagOfUser(data) {
    data.forEach((element) => {
      let tbody = document.getElementById("tbody");
      let tr = document.createElement("tr");
      const tdname = document.createElement("td");
      tdname.appendChild(document.createTextNode(element.name));
      const tdsurname = document.createElement("td");
      tdsurname.appendChild(document.createTextNode(element.email));
      const userTag = document.createElement("input");
      userTag.setAttribute("name", "name");
      userTag.setAttribute("value", element._id);
      userTag.setAttribute("type", "radio");
      const tdcheckbox = document.createElement("td");
      tdcheckbox.appendChild(userTag);
      tr.append(tdname, tdsurname, tdcheckbox);
      tbody.appendChild(tr);
    });
  };
  
  createTagForShow = (data) => {
    data.arrayOfCard.forEach((element) => {
      console.log(element);
      let tbody = document.getElementById("tbody2");
      let tr = document.createElement("tr");
      const tdname = document.createElement("td");
      tdname.appendChild(document.createTextNode(element.cardName));
      const tdsurname = document.createElement("td");
      tdsurname.appendChild(document.createTextNode(element.cardBank));
      const userTag = document.createElement("input");
      userTag.setAttribute("name", "name");
      userTag.setAttribute("value", element._id);
      userTag.setAttribute("type", "radio");
      const tdcheckbox = document.createElement("td");
      tdcheckbox.appendChild(userTag);
      tr.append(tdname, tdsurname, tdcheckbox);
      tbody.appendChild(tr);
    });
  };
  
  reloadPage = () => {
    document.getElementById("reloadPage").addEventListener("click", () => {
      window.location.reload();
    });
  };
  
  getCheckedUserId = () => {
    let id;
    const user = document.querySelectorAll('input[name="name"]');
    user.forEach((data) => {
      if (data.checked) {
        id = data.value;
      }
    });
    return id;
  };