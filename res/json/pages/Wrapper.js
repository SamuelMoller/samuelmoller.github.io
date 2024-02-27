// =====================================================================================================
// Samuel Möller, 2024
// 
// This file contains the Wrapper class, which is responsible for creating a background wrapper
// for the entire page.
// =====================================================================================================

export class Wrapper {
    constructor() {
        this.initStructure();
    }

// =====================================================================================================
    initStructure() {
        let self = this;
        $("body").append("<header></header>");
        $("body").append("<main></main>");
        $("body").append("<footer></footer>");
        self.initHeader();
    }

    initHeader() {
        let self = this;
        $("header").append("<div class='header-content'></div>");
        $(".header-content").append("<div id='header-content-left'></div>");
        $(".header-content").append("<div id='header-content-right'></div>");
        $("#header-content-left").append("<img src='res/img/logo-small.png' >");
        $("#header-content-left").append("<h1>The Old Sea Turtle</h1>");
        $("#header-content-right").append("<p>Book a table</p>");
        $("#header-content-right").append("<p>Apply for VIP</p>");
        $("#header-content-right").append("<p>Login</p>");
    }
}