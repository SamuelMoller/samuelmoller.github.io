// =====================================================================================================
// Design, implementation, styling, and polish: Samuel Möller
// =====================================================================================================

import * as PH from '../PageHandler.js';
import * as util from "../Utilities.js";
import { Order } from "../struct/Order.js";
import * as buffer from "../struct/ActionBuffer.js";

export class OrderHandler {
    constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.items = new Map(); // Create a map to store items in the order
        this.totalCost = 0;
        this.order = new Order();
        this.data = [];
        if (arg2) {
            this.init();
        }
    }

// =====================================================================================================
    init() {
        let self = this;
        $.getJSON("res/json/DB/Beverages.js")
        .done((data) => {  // Use an arrow function for reasons
            self.data = data;
            PH.clear();
            _init(self.arg1); // Only initialize when JSON is loaded
        })
        .fail((jqXHR, textStatus, error) => {
            console.log("getJSON failed, status: " + textStatus + ", error: " + error);
        });
        
        function _init(element) {
            /* Menu */
            // Initiates elements to be populated with values from update()
            $(element).append("<div id='orderContent'></div>");
            $("#orderContent").append("<div id='orderBackground'></div>");
            $.each(self.data, function(key, val) { // Iterate over entries
                $('<div id=orderContainer' + val.nr + ' class=beverageItemContainer draggable=true>').on("click", function() { // Create div element with click event listener and unique id
                    self.add(val.articleid); // Add item to order
                }).on("dragstart", function(e) {
                    util.order_drag(e, val.articleid); // Initiate drag response
            }).appendTo("#orderBackground");
                $("#orderContainer" + val.nr).append("<img src='res/img/products/beer/" + val.articleid + ".jpg'>"); // Consider a listener for image load here
                $("<p>").text(val.name).appendTo("#orderContainer" + val.nr); // Item name
            });

            /* Basket */
            $("#orderContent").append("<div id='orderBasket'></div>");
            $("#orderBasket").on("drop", function(e) {
                util.order_drop(e, self); // Execute response when dragged object is dropped
            }).on("dragover", util.allowDrop); // I love chaining jQuery functions
            $("#orderBasket").append("<div id='orderBasketHeader'></div>");
            $("#orderBasketHeader").append("<div id=orderBasketHeader-L></div>");
            $("#orderBasketHeader").append("<div id=orderBasketHeader-R></div>");
            $("#orderBasketHeader-L").append("<h2>" + util.trans("order") + "</h2>"); // Get translated string

            $("#orderBasket").append("<div id='orderBasketContent'></div>");

            $("#orderBasket").append("<div id='orderBasketFooter'></div>");
            $("#orderBasketFooter").append("<div id='orderBasketFooter-L'></div>");
            $("#orderBasketFooter").append("<div id='orderBasketFooter-R'></div>");

            $("<img id='basketUndo' src='res/img/svg/undo.svg' />").on("click", function() {
                self.items = buffer.undo("order", self.items) // Add to UNDO-REDO buffer
                self.update(); // Update the order, per the MVC paradigm
            }).appendTo("#orderBasketHeader-R");
            $("<img id='basketRedo' src='res/img/svg/redo.svg' />").on("click", function() {
                self.items = buffer.redo("order", self.items)
                self.update();
            }).appendTo("#orderBasketHeader-R");
            $("#orderBasketFooter-L").append("<h2 id='footerTotal'>" + util.trans("total") + ": €0</h2>");
            $("<button id='orderNow'>" + util.trans("placeOrder") + "</button>").on("click", function() {
                self.send();
            }).appendTo("#orderBasketFooter-R");
        }
    }

// =====================================================================================================
    update() {
        /* Update the order. */
        let self = this;
        let total = 0;
        $("#orderBasketContent").empty();
        self.items.forEach((val, key) => {
            let name = self.data.find(item => item.articleid === key).name; // Lookup name from data
            let price = self.data.find(item => item.articleid === key).priceinclvat; // Do the same for price
            total += price * val;
            $("<div id=basketItem" + key + " class='basketItem'></div>").on("click", function() {
                self.items.set(key, val - 1);
                if (val - 1 <= 0) {
                    self.items.delete(key); // Remove item from order if count is 0
                }
                buffer.add("order", [key, -1]); // Add to UNDO-REDO buffer
                self.update();
            }).appendTo("#orderBasketContent");
            $("#basketItem" + key).append("<p id='" + key + "-1' style='flex-flow: column nowrap;'>" + name + "</p>");
            $("#basketItem" + key).append("<p id='" + key + "-2' style='margin-left: auto;'>€" + util.toFixed(price * val, 2) + "</p>");
            $("#" + key + "-1").append("<p id='" + key + "-1-sub' style='visibility: hidden; font-size: 0.5vw; margin-left: 1em;'>" + val + " * €" + price + "/each</p>");
            if (val > 1) {
                if ( ($("#" + key + "-1-sub").css("visibility")) == "hidden" ) {
                        $("#" + key + "-1-sub").css("visibility", "visible"); 
                }  
            }
        });
        $("#footerTotal").text("Total: €" + util.toFixed(total, 2));
    }

// =====================================================================================================
    displayBasket(bool) { // DEPRECATED
        /* Display or hide the basket. */
        if (bool) {
            $("#orderContent").css("width", "80%");
            $("#orderContent").css("left", "-7.5%");
            $("#orderBasket").css("visibility", "visible");
            $("[class='beverageItemContainer']").css("width", "11.9%");
        } else {
            $("#orderContent").css("width", "95%");
            $("#orderContent").css("left", "0");
            $("#orderBasket").css("visibility", "hidden");
            $("[class='beverageItemContainer']").css("width", "10%");
        }
    }

// =====================================================================================================
    add(articleid) {
        /* Add an item to the order. */
        let self = this;
        if (!self.items.has(articleid)) {
            self.items.set(articleid, 1);
        } else {
            self.items.set(articleid, self.items.get(articleid) + 1);
        }
        buffer.add("order", [articleid, 1]); // Add to UNDO-REDO buffer
        self.update();
    }

// =====================================================================================================
    send() {
        /* Send the order. */
        /* Consider modifying local storage as well */
        let self = this;
        self.items.forEach((val, key) => {
            self.order.add(key, val); // Add item to order object (for passing to other modules)
        });
        alert(util.trans("orderThanks"));
        self.empty();
    }

// =====================================================================================================
    empty() {
        /* Empty the order. */
        let self = this;
        self.items.clear();
        self.order.items.clear();
        self.totalCost = 0;
        $("#footerTotal").text(util.trans("total") + ": €0");
        buffer.clear("order");
        self.update(); // Reload the order basket
    }

// =====================================================================================================
    _list() {   // DEPRECATED
        /* Prototype initMenu() function. */
        let self = this;
        let order = new Order();
        $("#orderNow").off("click"); // Remove click event listener (do once)
        $("#orderMenu").append("<div id='beverages'></div>"); // Append div element to body
        $.getJSON("res/json/DB/Beverages.js", function(data) { // Load JSON database
            $.each(data, function(key, val) { // Iterate over entries
                $('<div id=container' + val.nr + ' class=beverageItemContainer>').on("click", function() { // Create div element with click event listener and unique id
                    order.addItem(val.name); // Add item to order
                }).appendTo("#beverages"); // Append two paragraphs to the div element
                $("<p class=beverageItem_L>").text(val.name).appendTo("#container" + val.nr); // Item name
                $("<p id=bev" + val.nr + " class=beverageItem_R>").text("(0)").appendTo("#container" + val.nr); // Item count (space reserved)
            });
        });
        $("<button id=placeOrder>").text("Place order").on("click", function() {
            order.printOrder();
        }).appendTo("#orderMenu");
    }

// =====================================================================================================
    _debugLogBeers() {
        /*  Load JSON database and for each key (entry),
            print that corresponding value's name. */
        $.getJSON("res/json/DB/Beverages.js", function(data) { // Load JSON database
            $.each(data, function(key, val) { // Iterate over entries
                console.log(val.name + ", " + val.country); // Print the name of the entry
            });
        }).fail(function(jqXHR, textStatus) {
            console.log("error: " + textStatus);
            console.log("incoming Text: " + jqXHR.responseText);
        });
    }
}
