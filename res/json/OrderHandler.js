class OrderHandler {
    constructor() {
        this.items = new Map();
        let self = this;
        console.log("OrderHandler created");
    }


    buildOrderMenu() {
        let self = this;
        $("body").append("<div id='orderMenu'></div>");  // Append div element to body
        $("#orderMenu").append("<button id='orderNow'>Order now</button>");  // Append button element to body
        $("#orderNow").on("click", function(){
            self.listItems();
        });
    }


    listItems() {
        let self = this;
        $("#orderNow").off("click");
        $("#orderMenu").append("<div id='beverages'></div>");  // Append div element to body
        $.getJSON("res/json/Beverages.js", function(data) { // Load JSON database
            $.each(data, function(key, val) {   // Iterate over entries
                $('<div id=container' + val.nr + ' class=beverageItemContainer>').on("click", function() {
                    self.addToOrder(val.name, val.nr);
                }).appendTo("#beverages");
                $("<p class=beverageItem_L>").text(val.name).appendTo("#container" + val.nr);
                $("<p id=bev" + val.nr + " class=beverageItem_R>").text("(0)").appendTo("#container" + val.nr);
            });
        });
        $("<button id=placeOrder>").text("Place order").on("click", function() {
            self.printOrder();
        }).appendTo("#orderMenu");
    }


    addToOrder(item, id) {
        let self = this;
        if (self.items.has(item)) {
            self.items.set(item, self.items.get(item) + 1);
            console.log("Added 1 " + item + " to order (total: " + self.items.get(item) + ")");
        } else {
            self.items.set(item, 1);
            console.log("Added 1 " + item + " to order (new)")
        }
        $("#bev" + id).text("(" + self.items.get(item) + ")");
        $("#bev" + id).css("visibility", "visible");
    }


    printOrder() {
        let self = this;
        let total = 0;
        self.items.forEach(function(value, key) {
            if (value > 0) {
                console.log(key + ": " + value);
                self.items.set(key, 0);
                total += value;
            }
        });
        if (total > 0) { console.log("Total: " + total); }
        else { console.log("No items in order") }
        if (total > 20) { console.log("Damn, bro"); }
        $("#beverages").remove();
        $("#placeOrder").remove();
        $("#orderNow").on("click", function(){
            self.listItems();
        });
    }


    _debugLogBeers() {
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
