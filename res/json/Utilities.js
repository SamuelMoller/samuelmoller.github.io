import * as PH from "./PageHandler.js";

export function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

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

export function idleTimer(lim, page) {
    let time = 0;
    $(document).on("mousemove", function() {
        time = 0;
    });
    $(document).on("keypress", function() {
        time = 0;
    });
    let interval = setInterval(function() {
        time++;
        if (time > lim) {
            clearInterval(interval);
            PH.page(page);
        }
    }, 1000);
}