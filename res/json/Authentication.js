// =====================================================================================================
// Design & implementation: Ayo Eyesan
// Styling: Ayo Eyesan
// Integration & polish: Samuel Möller
// =====================================================================================================

import { DB } from './DB/Users.js';

export class Authentication {
    constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
        if (arg2) {
            this.init();
        }
    }

// =====================================================================================================
    init() {
        let self = this;
        self._init(self.arg1);
    }

    _init(element) {
        let self = this
        $(element).append("<div class='container'>")
        $(".container").append("<h1 id='login-header'>Login</h1>")
        $(".container").append("<form onsubmit='return false'>")
        $("form").append("<label for='username'>Username:</label>")
        $("form").append("<input type='text' id='username' name='username'><br><br>")
        $("form").append("<label for='password'>Password:</label>")
        $("form").append("<input type='text' id='password' name='password'><br><br>")
        $("form").append("<input type='submit' value='Submit'>")
        $(":submit").on("click", function(e) {
            // console.log(DB["users"].filter(function(DB) { return DB.username == "jorass"}))
            self.login()
        });
    }

// =====================================================================================================
    login() {
        /* 
        Credentials:
        -1: Undefined/Denied
        0: Manager
        1: Bartender
        2: Waiting staff
        3: VIP
        4: Guest (unused)
        */

        const form = $("form")
        const username = $("#username").val()
        const password = $("#password").val()

        switch (parseInt(_login(username, password))) {
            case 0: // Manager
                break;
            case 1: // Bartender
                break;
            case 2: // Waiting staff
                break;
            case 3: // VIP
                break;
            default:
                alert("No account associated with this username and/or password");
        }

        function _login(username, password) {
            let user = DB["users"].filter(function(data) { return data.username == username})[0];
            if (user === undefined) {
                return -1;
            } else if (user["password"] === password) {
                return user["credentials"];
            }
            return -1;
        }
    };

// =====================================================================================================
    logout() {
        const form = document.querySelector("form")
    
        form.addEventListener("click",(e)=>{
            e.preventDefault()
            window.location.replace = "Login.js"
        });
    }
}
