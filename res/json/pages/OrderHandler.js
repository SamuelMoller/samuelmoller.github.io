// =====================================================================================================
// Samuel Möller, 2024
//
// This file contains the OrderHandler class, which is responsible for creating an order menu,
// listing items, adding items to an order, and printing the order. It also contains a debug
// method that prints all beers from the JSON database file.
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
            _init(self.arg1);
        })
        .fail((jqXHR, textStatus, error) => {
            console.log("getJSON failed, status: " + textStatus + ", error: " + error);
        });
        
        function _init(element) {
            /* Menu */
            $(element).append("<div id='orderContent'></div>");
            $("#orderContent").append("<div id='orderBackground'></div>");
            $.each(self.data, function(key, val) { // Iterate over entries
                $('<div id=orderContainer' + val.nr + ' class=beverageItemContainer draggable=true>').on("click", function() { // Create div element with click event listener and unique id
                    self.add(val.articleid); // Add item to order
                }).on("dragstart", function(e) {
                    util.order_drag(e, val.name, val.priceinclvat, val.articleid);
            }).appendTo("#orderBackground");
                $("#orderContainer" + val.nr).append("<img src='res/img/products/beer/" + val.articleid + ".jpg'>"); // Consider a listener for image load here
                $("<p>").text(val.name).appendTo("#orderContainer" + val.nr); // Item name
            });

            /* Basket */
            $("#orderContent").append("<div id='orderBasket'></div>");
            $("#orderBasket").on("drop", function(e) {
                util.order_drop(e, self);
            }).on("dragover", util.allowDrop);
            $("#orderBasket").append("<div id='orderBasketHeader'></div>");
            $("#orderBasket").append("<div id='orderBasketContent'></div>");
            $("#orderBasket").append("<div id='orderBasketFooter'></div>");
            $("#orderBasketHeader").append("<h2>Order</h2>");
            $("#orderBasketFooter").append("<h2 id='footerTotal'>Total: €0</h2>");
            $("<button id='orderNow'>Order now</button>").on("click", function() {
                self.send();
            }).appendTo("#orderBasketFooter");
            $("<button id='basketUndo'>Undo</button>").on("click", function() {
                self.items = buffer.undo("order", self.items)
                self.update();
            }).appendTo("#orderBasketHeader");
            $("<button id='basketRedo'>Redo</button>").on("click", function() {
                self.items = buffer.redo("order", self.items)
                self.update();
            }).appendTo("#orderBasketHeader");
            self.displayBasket(1); // HACK: Dodging my CSS responsibilities
        }
    }

// =====================================================================================================
    update() {
        /* Update the order. */
        let self = this;
        let total = 0;
        $("#orderBasketContent").empty();
        self.items.forEach((val, key) => {
            let name = self.data.find(item => item.articleid === key).name;
            let price = self.data.find(item => item.articleid === key).priceinclvat;
            total += price * val;
            $("<div id=basketItem" + key + " class='basketItem'></div>").on("click", function() {
                self.items.set(key, val - 1);
                if (val - 1 <= 0) {
                    self.items.delete(key);
                }
                buffer.add("order", [key, -1]);
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
        $("#footerTotal").text("€" + util.toFixed(total, 2));
    }

// =====================================================================================================
    displayBasket(bool) {
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
        let self = this;
        self.items.forEach((val, key) => {
            self.order.add(key, val);
        });
        console.log(self.order.items); // DEBUG: Do something useful here
        self.empty();
    }

// =====================================================================================================
    empty() {
        /* Empty the order. */
        let self = this;
        self.items.clear();
        self.order.items.clear();
        self.totalCost = 0;
        $("#footerTotal").text("Total: €0");
        buffer.clear("order");
        self.update();
        // self.displayBasket(0); // HACK
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
