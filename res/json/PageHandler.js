import { Wrapper } from "./pages/Wrapper.js";
import { OrderHandler } from "./pages/Orders.js";

$("document").ready(function() {    // When document is ready/loaded
    var wrapper = new Wrapper();
    var orderHandler = new OrderHandler();
});
