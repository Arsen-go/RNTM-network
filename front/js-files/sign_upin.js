function registerUser() {
console.log(createUserObject())
  if (checkInputParams()) {
    fetch("/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Autorization: "Berier " + localStorage.getItem("authToken"),
        //xaccesstoken: localStorage.getItem("authToken"),
        Accept: "application/json",
      },

      body: JSON.stringify(createUserObject()),
    }).then((res) => {
      return res.json();
    })
      .then((obj) => {
        console.log(obj);
        if (obj.result) {
          window.location.href = "http://localhost:3000/newsfeed.html";
        } else {
          document.getElementById("infoEmail").innerHTML = obj.info;
        }
      });
  }
}

function createUserObject() {
  let obj = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phoneNumber").value,
    birth: document.getElementById("birth").value,
    login: document.getElementById("login").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
    gender: getGender(),
    online:false
  }
  return obj;
}

function getGender() {
  if (document.getElementById("male").checked) {
    return "male";
  } else {
    return "female";
  }
}

function checkInputParams() {
  let check = 0;
  if (!document.getElementById("name").value.length) {
    infoName.innerHTML = "Name is required";
    ++check;
  } else if (document.getElementById("name").value.length <= 4) {
    infoName.innerHTML = "Name is too short";
    ++check;
  } else {
    infoName.innerHTML = " ";
  }
  // phone number checker is not finished
  let phoneValid = /^\d{9}$/;
  
  if (!phoneNumber.value.match(phoneValid)) {
    infoPhone.innerHTML = "Phone number is not valid";
    ++check;
  } else {
    infoPhone.innerHTML = " ";
  }

  if (!document.getElementById("birth").value.length) {
    infoBirth.innerHTML = "Birth is required";
    ++check;
  } else {
    infoBirth.innerHTML = " ";
  }

  if (document.getElementById("login").value.length <= 4) {
    infoLogin.innerHTML = "Login must be not less than 5 charachter!";
    ++check;
  } else {
    infoLogin.innerHTML = " ";
  }

  let passValid = /^[A-Za-z]{4,10}$/;
  
  if (!passValid.test(password.value)) {
    infoPassword.innerHTML = "Password must contain only characters, numeric digits, underscore and first character must be a letter";
    ++check;
  } else {
    infoPassword.innerHTML = " ";
  }

  if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value))) {
    infoEmail.innerHTML = "Invalid Email address";
    ++check;
  } else {
    infoEmail.innerHTML = " ";
  }
  return check === 0;
}

function loginUser() {
  let obj = {
    login: document.getElementById("login").value,
    password: document.getElementById("password").value
  }
  fetch("/loginUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      xaccesstoken: localStorage.getItem("authToken"),
      Accept: "application/json",
    },
    body: JSON.stringify(obj),
  }).then((res) => {
    return res.json();
  })
    .then((obj) => {
     console.log(obj)
     alert("obj")
      if (obj.log) {
        localStorage.setItem("authToken", obj.token);
        localStorage.setItem("email", obj.email);
        localStorage.setItem("userId", obj.userId);
        window.location.href = "./newsfeed.html";
      }else{
        infoLoginUser.innerHTML = obj.info;
      }

    }).catch((err) => {
      console.log(err);
    })
}