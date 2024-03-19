// =====================================================================================================
// Design, implementation, styling, and polish: Samuel Möller
// =====================================================================================================

import * as PH from '../PageHandler.js';
import * as util from "../Utilities.js";

export class Header {
    constructor() {
    }

// =====================================================================================================
    init() {
        $("header").append("<div class='header-content'></div>");
        $(".header-content").append("<div id='header-content-left'></div>");
        $(".header-content").append("<div id='header-content-right'></div>");
        $("#header-content-left").append("<img id='header-img' src='res/img/png/logo-small.png' >");
        $("#header-content-left").append("<h1 id='header-title'>" + util.trans("title") + "</h1>");
        $("#header-content-right").append("<p id='headerBooking'>" + util.trans("booking") + "</p>");
        $("#header-content-right").append("<p id='headerApply'>" + util.trans("vip") + "</p>");
        $("#header-content-right").append("<p id='headerLogin'>" + util.trans("login") + "</p>");

        $("#header-img, #header-title").on("click", function() {
            PH.page("order");
        });

        $("#headerLogin").on("click", function() {
            PH.page("login");
        });
    }

    initAuth() {
        $("#headerLogin").text(util.trans("logout"));
        $("#headerLogin").on("click", function() {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("password");
            $("#headerInventory").remove();
            $("#headerLogin").text(util.trans("login"));
        });
        $("<p id='headerInventory'>" + util.trans("inventory") + "</p>").on("click", function() {
            PH.page("inventory");
        }).insertBefore("#headerLogin");
    }
}

const instance = new Header();
export { instance };