
let isLoggedIn = false

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;


for(i = 0; i < DB.users.length; i++) {
    if(DB.users[i]["username"] == username) {
        if(DB.users[i]["password"] == password) {
            isLoggedIn = true
            if(DB.users[i]["credentials"] == 0) {
               window.location.href = "staff page"
           }
            window.location.href = "user page"
        }
        else {
            alert("no passowrd associated with this username")
        }
    }
}
alert("no account associated with this username")
