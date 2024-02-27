import { Wrapper } from "./pages/Wrapper.js";
import { OrderHandler } from "./pages/OrderHandler.js";
import { Homepage } from "./pages/Homepage.js";

$("document").ready(function() {    // When document is ready/loaded
    var wrapper = new Wrapper();
    var homepage = new Homepage();
    var orderHandler = new OrderHandler("main");
});
