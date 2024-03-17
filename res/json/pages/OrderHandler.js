// =====================================================================================================
// Samuel Möller, 2024
//
// This file contains the OrderHandler class, which is responsible for creating an order menu,
// listing items, adding items to an order, and printing the order. It also contains a debug
// method that prints all beers from the JSON database file.
// =====================================================================================================

import { Order } from "../struct/Order.js"; // Import Order class from Order.js
import { toFixed } from "../Utilities.js";

export class OrderHandler {
    constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.items = new Map(); // Create a map to store items in the order
        this.totalCost = 0;
        this.order = new Order();
        if (arg2) {
            this.init();
        }
    }

// =====================================================================================================
    init() {
        let self = this;
        _init(self.arg1);
        
        function _init(element) {
            let self = this;
            /* Create a menu for ordering items. */
            $(element).append("<div id='orderContent'></div>");
            $("#orderContent").append("<div id='orderBackground'></div>");
            $.getJSON("res/json/DB/Beverages.js", function(data) { // Load JSON database
                $.each(data, function(key, val) { // Iterate over entries
                    $('<div id=orderContainer' + val.nr + ' class=beverageItemContainer>').on("click", function() { // Create div element with click event listener and unique id
                        self.add(val.name, val.priceinclvat, val.articleid); // Add item to order
                    }).appendTo("#orderBackground");
                    $("#orderContainer" + val.nr).append("<img src='res/img/products/beer/" + val.articleid + ".jpg'>"); // Consider a listener for image load here
                    $("<p>").text(val.name).appendTo("#orderContainer" + val.nr); // Item name
                });
            });
            self.initBasket();
        }
    }

    

// =====================================================================================================
    initBasket() {
        /* Create a basket for the order. */
        let self = this;
        $("#orderContent").append("<div id='orderBasket'></div>");
        $("#orderBasket").append("<div id='orderBasketHeader'></div>");
        $("#orderBasket").append("<div id='orderBasketContent'></div>");
        $("#orderBasket").append("<div id='orderBasketFooter'></div>");
        $("#orderBasketHeader").append("<h2>Order</h2>");
        $("#orderBasketFooter").append("<h2 id='footerTotal'>Total: €0</h2>");
        $("<button id='orderNow'>Order now</button>").on("click", function() {
            self.send();
        }).appendTo("#orderBasketFooter");
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
    add(name, priceinclvat, articleid) {
        /* Add an item to the order. */
        let self = this;
        if (self.items.size == 0) {
            self.displayBasket(1);
        }
        if (!self.items.has(articleid)) {
            self.items.set(articleid, 1);
            $("#orderBasketContent").append("<div id=basketItem" + articleid + " class='basketItem'></div>");
            $("#basketItem" + articleid).append("<p id='" + articleid + "-1' style='flex-flow: column nowrap;'>" + name + "</p>");
            $("#basketItem" + articleid).append("<p id='" + articleid + "-2' style='margin-left: auto;'>€" + priceinclvat + "</p>");
            $("#" + articleid + "-1").append("<p id='" + articleid + "-1-sub' style='visibility: hidden; font-size: 0.5vw; margin-left: 1em;'>1 * €" + priceinclvat + "/each</p>");
        } else {
            self.items.set(articleid, self.items.get(articleid) + 1);
            $("#" + articleid + "-1-sub").text(self.items.get(articleid) + " * €" + priceinclvat + "/each");
            $("#" + articleid + "-2").text("€" + toFixed(self.items.get(articleid) * priceinclvat, 2));
            if ( ($("#" + articleid + "-1-sub").css("visibility")) == "hidden" ) {
                $("#" + articleid + "-1-sub").css("visibility", "visible");
            }
        }
        self.totalCost += Number(priceinclvat);
        $("#footerTotal").text("€" + toFixed(self.totalCost, 2));
    }

// =====================================================================================================
    send() {
        /* Send the order. */
        let self = this;
        self.items.forEach((val, key) => {
            self.order.add(key, val);
        });
        console.log(self.order.items); // Debug
        self.order.items.clear();
        self.items.clear();
        self.empty();
    }

// =====================================================================================================
    empty() {
        /* Empty the order. */
        let self = this;
        self.items.clear();
        self.order.items.clear();
        self.totalCost = 0;
        $("#orderBasketContent").empty();
        $("#footerTotal").text("Total: €0");
        self.displayBasket(0);
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
