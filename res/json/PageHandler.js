import { Header } from "./pages/Header.js";
import { Homepage } from "./pages/Homepage.js";
import { Authentication } from "./Authentication.js";
import { OrderHandler } from "./pages/OrderHandler.js";
import { Inventory } from "./pages/Inventory.js";

$("document").ready(function() {    // When document is ready/loaded
    $("body").append("<header></header>");
    $("body").append("<main></main>");
    $("body").append("<footer></footer>");
    var header = new Header();
    var homepage = new Homepage();
    var OH = new OrderHandler("main", 0);
    var INV = new Inventory("main", 0);
    var AUTH = new Authentication("main", 1);
});
