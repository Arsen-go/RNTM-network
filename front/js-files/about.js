window.onload = () => {
  getInfoUser();
};

function getInfoUser() {
  fetch("/getInfoUser", {
    method: "post",
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
      console.log(obj.birth);
      document.getElementById("iuser").innerHTML = obj.name;
      document.getElementById("ibirth").innerHTML = obj.birth;
      document.getElementById("iphone").innerHTML = obj.phone;
      document.getElementById("iemail").innerHTML = obj.email;
    });
}

function update() {
  let passValid = /^[A-Za-z]{4,10}$/;
  if (!passValid.test(input.value)) {
    infoPassword.innerHTML =
      "Password must contain only characters and at least 4 length";
    return false;
  }
  if (!(confirmPassword.value === input.value)) {
    infoPassword.innerHTML = "New and Confirm is not same";
    return false;
  }
  fetch("editPassword/changeUserPassword", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId: localStorage.getItem("userId"),
      newPassword: input.value,
      oldPassword: currentPassword.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((obj) => {
      console.log(obj);
    });
}
