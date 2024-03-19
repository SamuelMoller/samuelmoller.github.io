// =====================================================================================================
// Samuel Möller, 2024
//
// =====================================================================================================

import * as util from "./Utilities.js";
import { Header } from "./pages/Header.js";
import { Hero } from "./pages/Hero.js";
import { Authentication } from "./Authentication.js";
import { OrderHandler } from "./pages/OrderHandler.js";
import { Inventory } from "./pages/Inventory.js";

export function page(arg) {
    switch (arg) {
        case "login":
            const AUTH = new Authentication("main", 1);
            break;
        case "order":
            const OH = new OrderHandler("main", 1);
            break;
        case "inventory":   
            const INV = new Inventory("main", 1);
            break;
        default:
            alert("404: Page not found");
    }
}

export function clear() {
    $("main").empty();
}

$("document").ready(function() {    // When document is ready/loaded
    // util.idleTimer(60, "login");
    $("body").append("<header></header>");
    const header = new Header();
    const hero = new Hero("body", 1);
    $("body").append("<main></main>");
    $("body").append("<footer></footer>");
    page("inventory")
});
