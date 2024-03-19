// =====================================================================================================
// Design, implementation, styling, and polish: Samuel Möller
// =====================================================================================================

import { Locale as locale } from './DB/Locale.js';

// =====================================================================================================
// Translation functions

export function setLang(lang) {
    sessionStorage.setItem("lang", lang);
    console.log("Language set to: " + lang);
};

export function getLang() {
    return sessionStorage.getItem("lang");
};

export function trans(key) {
    return locale[getLang()][0][key];
};

// =====================================================================================================
// Float to fixed decimal places

export function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

// =====================================================================================================
// Drag and drop functions

export function allowDrop(e) { // Prevent default behavior of dropping object
    e.preventDefault();
}

export function order_drag(e, articleId) { // Set key to id of dragged object
    e.originalEvent.dataTransfer.setData("id", articleId);
}

export function order_drop(e, orderHandler) { // Get id of dragged object and add it to the order
    const id = e.originalEvent.dataTransfer.getData("id");
    orderHandler.add(id);
}

// =====================================================================================================
// Idle timer
// Could be expanded with further functionality, 
// such as clearing session/local storage, or redirecting to a new page.

export function idleTimer(lim, page) {
    let time = 0;
    let events = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    $.each(events, function(i, event) {
        $(document).on(event, function() {
            time = 0;
            animateHero(false, "#hero", "#hero-img");
        });
    });
    let interval = setInterval(function() {
        time++;
        if (time > lim) {
            time = 0;
            // PH.page(page); // Additional functionality to redirect to a new page on idle timeout.
            animateHero(true, "#hero", "#hero-img"); // Animate the hero image to cover page.
        }
    }, 1000);
}

export function animateHero(b, e1, e2) {
    $(e1 + ", " + e2).css({
            transition: "height 1s ease-in-out",
            height: b ? "100vmin" : "30vmin" // I love tertiary operators, man. Coolest thing in this project.
    });
}
// =====================================================================================================