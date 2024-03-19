// =====================================================================================================
// Design, implementation, styling, and polish: Samuel Möller
// =====================================================================================================

import * as util from "./Utilities.js";
import { Header } from "./pages/Header.js";
import { Footer } from "./pages/Footer.js";
import { Hero } from "./pages/Hero.js";
import { Authentication } from "./Authentication.js";
import { OrderHandler } from "./pages/OrderHandler.js";
import { Inventory } from "./pages/Inventory.js";

let current;
let header = new Header();

export function page(arg) {
    switch (arg) {
        case "login":
            const AUTH = new Authentication("main", 1);
            current = arg;
            break;
        case "order":
            const OH = new OrderHandler("main", 1);
            current = arg;
            break;
        case "inventory":   
            const INV = new Inventory("main", 1);
            current = arg;
            break;
        default:
            alert("404: Page not found");
    }
}

export function clear() {
    $("main").empty();
}

export function reload() {
    clear();
    $("header").empty();
    header.init();
    page(current);
}

$("document").ready(function() {    // When document is ready/loaded
    util.idleTimer(60, "login");
    util.setLang("en-US");
    $("body").append("<header></header>");
    header.init();
    const hero = new Hero("body", 1);
    $("body").append("<main></main>");
    $("body").append("<footer></footer>");
    const footer = new Footer();
    page("order")
});
