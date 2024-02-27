// =====================================================================================================
// Samuel Möller, 2024
// 
// This file contains the OrderHandler class, which is responsible for creating an order menu,
// listing items, adding items to an order, and printing the order. It also contains a debug
// method that prints all beers from the JSON database file.
// =====================================================================================================

import { Order } from "../struct/Order.js"; // Import Order class from Order.js

export class OrderHandler {
    constructor(arg1) {
        this.items = new Map(); // Create a map to store items in the order
        this.buildOrderMenu(arg1); // Call buildOrderMenu() when object is created
    }

// =====================================================================================================
    buildOrderMenu(element) {
        let self = this;
        let order = new Order();
        $(element).append("<div id='orderContent'></div>"); // Append div element to 'content'
        $("#orderContent").append("<div id='orderBackground'></div>"); // Append button element to body
        $.getJSON("res/json/DB/Beverages.js", function(data) { // Load JSON database
            $.each(data, function(key, val) { // Iterate over entries
                $('<div id=orderContainer' + val.nr + ' class=beverageItemContainer>').on("click", function() { // Create div element with click event listener and unique id
                    order.addItem(val.name); // Add item to order
                }).appendTo("#orderBackground");
                $("<p class=beverageItem_L>").text(val.name).appendTo("#orderContainer" + val.nr);
            });
        });
    }

// =====================================================================================================
    listItems() {
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
