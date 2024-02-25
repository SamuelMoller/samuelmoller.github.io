class OrderHandler {
    constructor() {
    this.items = [];
    console.log("OrderHandler created");
    }

    buildOrderMenu() {
        $("body").append("<div id='orderMenu'></div>");  // Append div element to body
        $("#orderMenu").append("<button id='orderNow'>Order now</button>");  // Append button element to body
        $("#orderNow").on("click", function(){
            $("#orderMenu").append("<div id='beverages'></div>");  // Append div element to body
            $.getJSON("res/json/Beverages.js", function(data) { // Load JSON database
                $.each(data, function(key, val) {   // Iterate over entries
                    // Create paragraph element, attach click handler, and append to div
                    $("<p>").text(val.name).on("click", function() {
                        console.log("You clicked " + val.name);
                    }).appendTo("#beverages");
                });
            });
            $("#orderMenu").append("<button id='placeOrder'>Place order</button>");  // Append button element to body 
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
