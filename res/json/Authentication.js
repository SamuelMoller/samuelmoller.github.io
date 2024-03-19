// =====================================================================================================
// Design & implementation: Ayo Eyesan
// Styling: Ayo Eyesan
// Integration & polish: Samuel Möller
//
// TODO: Persisting login state
// =====================================================================================================

import * as PH from './PageHandler.js';
import { DB } from './DB/Users.js';
import { instance as header } from './pages/Header.js';

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
        PH.clear();
        _init(self.arg1);

        function _init(element) {
            $(element).append("<div class='loginContainer'>");
            $(".loginContainer").append("<h1 id='login-header'>Login</h1>");
            $(".loginContainer").append("<form id='loginForm' method=post>");
            $("form").append("<label for='username'>Username:</label>");
            $("form").append("<input type='text' id='username' name='username'>");
            $("form").append("<label for='password'>Password:</label>");
            $("form").append("<input type='password' id='password' name='password'>");
            $("form").append("<input type='submit' value='Submit'>");
            $("#loginForm").on("submit", function(event) {
                event.preventDefault();  // Prevent the form from being submitted normally (to prevent credentials in URL)
                self.login();  // Call the login function manually
            });
        }
    }

    

// =====================================================================================================
    login(username = null, password = null) {
        /* 
        Credentials:
        -1: Undefined/Denied
        0: Manager
        1: Bartender
        2: Waiting staff
        3: VIP
        4: Guest (unused)
        */
        username = $("#username").val();
        password = $("#password").val();

        let auth = parseInt(_login(username, password));
        if (auth > -1) {
            sessionStorage.setItem("username", username); // HORRIBLE security, but it's a prototype,
            sessionStorage.setItem("password", password); // and necessary without SQL or similar.
            header.initAuth();
        }
        redirect(auth);

        function _login(username, password) {
            let user = DB["users"].filter(function(data) { return data.username == username})[0];
            if (user === undefined) {
                return -1;
            } else if (user["password"] === password) {
                return user["credentials"];
            }
            return -1;
        }

        function redirect(arg) {
            switch (arg) {
                case 0: // Manager
                    PH.page("inventory");
                    break;
                case 1: // Bartender
                    PH.page("inventory");
                    break;
                case 2: // Waiting staff
                    PH.page("order");
                    break;
                case 3: // VIP
                    PH.page("order");
                    break;
                default:
                    alert("No account associated with this username and/or password");
            }
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
