window.onload = () => {
    getInfoUser();

}

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
            console.log(obj.birth)
            document.getElementById("iuser").innerHTML = obj.name;
            document.getElementById("ibirth").innerHTML = obj.birth;
            document.getElementById("iphone").innerHTML = obj.phone;
            document.getElementById("iemail").innerHTML = obj.email;
        });
}