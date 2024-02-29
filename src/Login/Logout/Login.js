import {DB} from './DBLoaded.js';

const form = document.querySelector("form")

form.addEventListener("submit",(e)=>{
    e.preventDefault()

let isLoggedIn = false
let credentials = 1

const username = document.getElementById("username").value
const password = document.getElementById("password").value

const loggedIn = login(username, password)

if (isLoggedIn == true && credentials == 0) {
    window.location.href = "staff page"
}
if (isLoggedIn == true && credentials == 3) {
    window.location.href = "user page"
}
if (isLoggedIn == false) {
    alert("no account associated with this username and/or password")
}

function login(username, password) {
    for( let i = 0; i < DB.users.length; i++) {
        if(DB.users[i]["username"] == username) {
            if(DB.users[i]["password"] == password) {
                isLoggedIn = true
                if(DB.users[i]["credentials"] == 0) {
                   credentials = 0
                   return isLoggedIn
                }
                credentials = 3
                return isLoggedIn
            }
    }
    }
}
})

