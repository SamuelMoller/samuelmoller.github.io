import { Header } from "./pages/Header.js";
import { OrderHandler } from "./pages/OrderHandler.js";
import { Homepage } from "./pages/Homepage.js";

$("document").ready(function() {    // When document is ready/loaded
    $("body").append("<header></header>");
    $("body").append("<main></main>");
    $("body").append("<footer></footer>");
    var header = new Header();
    var homepage = new Homepage();
    var OH = new OrderHandler();
    OH.initMenu("main");
});
