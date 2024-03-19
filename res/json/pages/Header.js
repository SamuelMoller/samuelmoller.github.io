// =====================================================================================================
// Samuel Möller, 2024
// =====================================================================================================

import * as PH from '../PageHandler.js';

export class Header {
    constructor() {
        this.init();
    }

// =====================================================================================================
    init() {
        let self = this;
        $("header").append("<div class='header-content'></div>");
        $(".header-content").append("<div id='header-content-left'></div>");
        $(".header-content").append("<div id='header-content-right'></div>");
        $("#header-content-left").append("<img id='header-img' src='res/img/png/logo-small.png' >");
        $("#header-content-left").append("<h1 id='header-title'>The Old Sea Turtle</h1>");
        $("#header-content-right").append("<p id='headerBooking'>Book a table</p>");
        $("#header-content-right").append("<p id='headerApply'>Apply for VIP</p>");
        $("#header-content-right").append("<p id='headerLogin'>Login</p>");

        $("#header-img, #header-title").on("click", function() {
            PH.page("order");
        });

        $("#headerLogin").on("click", function() {
            PH.page("login");
        });
    }

    initAuth() {
        $("#headerLogin").text("Logout");
        $("#headerLogin").on("click", function() {
            sessionStorage.clear();
            $("#headerInventory").remove();
            $("#headerLogin").text("Login");
        });
        $("<p id='headerInventory'>Inventory</p>").on("click", function() {
            PH.page("inventory");
        }).insertBefore("#headerLogin");
    }
}

const instance = new Header();
export { instance };