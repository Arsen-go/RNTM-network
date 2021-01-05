function registerUser() {
    let obj={
      name:document.getElementById("name").value,
      phone:document.getElementById("phoneNumber").value,
      birth:document.getElementById("birth").value,
      login:document.getElementById("login").value,
      password:document.getElementById("password").value,
      email:document.getElementById("email").value
    }

    fetch("/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Autorization: "Berier " + localStorage.getItem("authToken"),
        //xaccesstoken: localStorage.getItem("authToken"),
        Accept: "application/json",
      },
      body: JSON.stringify(obj),
    }) .then((res) => {
      return res.json();
    })
    .then((obj) => {
      console.log(obj);
      if(obj.result) {
        window.location.href = "http://localhost:3000/newsfeed.html";
      }
      alert(obj)
    });
  }