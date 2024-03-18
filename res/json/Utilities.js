import * as PH from "./PageHandler.js";

// =====================================================================================================
export function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

// =====================================================================================================
export function allowDrop(e) {
    e.preventDefault();
}

export function order_drag(e, name, price, articleId) {
    e.originalEvent.dataTransfer.setData("name", name);
    e.originalEvent.dataTransfer.setData("price", price);
    e.originalEvent.dataTransfer.setData("id", articleId);
}

export function order_drop(e, orderHandler) {
    const name = e.originalEvent.dataTransfer.getData("name");
    const price = e.originalEvent.dataTransfer.getData("price");
    const id = e.originalEvent.dataTransfer.getData("id");
    orderHandler.add(name, price, id);
}

// =====================================================================================================
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