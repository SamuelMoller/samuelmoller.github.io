// =====================================================================================================
// Samuel Möller, 2024
//
// =====================================================================================================

export class Header {
    constructor() {
        this.initHeader();
    }

// =====================================================================================================
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