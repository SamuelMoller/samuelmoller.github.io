// =====================================================================================================
// Samuel Möller, 2024
// 
// This file contains the OrderHandler class, which is responsible for creating an order menu,
// listing items, adding items to an order, and printing the order. It also contains a debug
// method that prints all beers from the JSON database file.
//
// TODO: removeFromOrder() method

class OrderHandler {
    constructor() {
        this.items = new Map(); // Create a map to store items in the order
        console.log("OrderHandler created");
    }

// =====================================================================================================
    buildOrderMenu() {
        let self = this; // Save reference to this object (damn Javascript enclosures)
        $("body").append("<div id='orderMenu'></div>"); // Append div element to body
        $("#orderMenu").append("<button id='orderNow'>Order now</button>"); // Append button element to body
        $("#orderNow").on("click", function(){
            self.listItems(); // Call listItems() when button is clicked
        });
    }

// =====================================================================================================
    listItems() {
        let self = this;
        $("#orderNow").off("click"); // Remove click event listener (do once)
        $("#orderMenu").append("<div id='beverages'></div>"); // Append div element to body
        $.getJSON("res/json/Beverages.js", function(data) { // Load JSON database
            $.each(data, function(key, val) { // Iterate over entries
                $('<div id=container' + val.nr + ' class=beverageItemContainer>').on("click", function() { // Create div element with click event listener and unique id
                    self.addToOrder(val.name, val.nr);
                }).appendTo("#beverages"); // Append two paragraphs to the div element
                $("<p class=beverageItem_L>").text(val.name).appendTo("#container" + val.nr); // Item name
                $("<p id=bev" + val.nr + " class=beverageItem_R>").text("(0)").appendTo("#container" + val.nr); // Item count (space reserved)
            });
        });
        $("<button id=placeOrder>").text("Place order").on("click", function() {
            self.printOrder();
        }).appendTo("#orderMenu");
    }

// =====================================================================================================
    addToOrder(item, id) {
        let self = this;
        if (self.items.has(item)) { self.items.set(item, self.items.get(item) + 1); // Increment item count if it exists
        } else { self.items.set(item, 1); } // Add item to map if it doesn't exist, set count to 1
        $("#bev" + id).text("(" + self.items.get(item) + ")"); // Update view item count
        $("#bev" + id).css("visibility", "visible"); // Make item count visible
    }

// =====================================================================================================
// 
    printOrder() {
        let self = this;
        let total = 0;
        self.items.forEach(function(value, key) { // Iterate over items in order
            if (value > 0) {
                console.log(key + ": " + value); // Print item and count (should be replaced with model method call)
                self.items.set(key, 0); // Reset item count
                total += value;
            }
        });
        if (total > 0) { console.log("Total: " + total); 
        } else { console.log("No items in order") }
        if (total > 20) { console.log("Damn, bro"); } // im thoisty
        $("#beverages").remove(); // Remove order menu
        $("#placeOrder").remove(); // Remove place order button
        $("#orderNow").on("click", function(){ // Re-enable order menu
            self.listItems();
        });
    }

// =====================================================================================================
    _debugLogBeers() {
        /*  Load JSON database and for each key (entry),
            print that corresponding value's name. */
        $.getJSON("res/json/Beverages.js", function(data) { // Load JSON database
            $.each(data, function(key, val) { // Iterate over entries
                console.log(val.name + ", " + val.country); // Print the name of the entry
            });
        }).fail(function(jqXHR, textStatus) {
            console.log("error: " + textStatus);
            console.log("incoming Text: " + jqXHR.responseText);
        });
    }
}
