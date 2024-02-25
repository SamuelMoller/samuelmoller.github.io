class OrderHandler {
    constructor() {
        this.items = new Map();
        console.log("OrderHandler created");
    }

    buildOrderMenu() {
        let self = this;
        $("body").append("<div id='orderMenu'></div>");  // Append div element to body
        $("#orderMenu").append("<button id='orderNow'>Order now</button>");  // Append button element to body
        $("#orderNow").on("click", function(){
            $("#orderMenu").append("<div id='beverages'></div>");  // Append div element to body
            $.getJSON("res/json/Beverages.js", function(data) { // Load JSON database
                $.each(data, function(key, val) {   // Iterate over entries
                    // Create paragraph element, attach click handler, and append to div
                    $("<p>").text(val.name).on("click", function() {
                        self.addToOrder(val.name);
                    }).appendTo("#beverages");
                });
            });
            // $("#orderMenu").append("<button id='placeOrder'>Place order</button>");  // Append button element to body 
            $("<button id=placeOrder>").text("Place order").on("click", function() {
                self.printOrder();
            }).appendTo("#orderMenu");
        });
    }

    addToOrder(item) {
        let self = this;
        if (self.items.has(item)) {
            self.items.set(item, self.items.get(item) + 1);
            console.log("Added 1 " + item + " to order (total: " + self.items.get(item) + ")");
        }
        else {
            self.items.set(item, 1);
            console.log("Added 1 " + item + " to order (new)")
        }
    }

    printOrder() {
        let self = this;
        self.items.forEach(function(value, key) {
            console.log(key + ": " + value);
        });
    }

    debugLogBeers() {
        /*  Load JSON database and for each key (entry),
            print that corresponding value's name. */
        $.getJSON("res/json/Beverages.js", function(data) { // Load JSON database
            $.each(data, function(key, val) {   // Iterate over entries
                console.log(val.name + ", " + val.country);  // Print the name of the entry
            });
        }).fail(function(jqXHR, textStatus) {
            console.log("error: " + textStatus);
            console.log("incoming Text: " + jqXHR.responseText);
        });
    }
}
