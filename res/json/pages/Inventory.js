// =====================================================================================================
// Design & implementation: Yixin Huang
// Styling: Yixin Huang
// Integration & polish: Samuel Möller
// =====================================================================================================

import * as PH from '../PageHandler.js';
import * as buffer from "../struct/ActionBuffer.js";

export class Inventory {
    constructor(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.inventoryData = [];
        if (arg2) {
            this.init();
        }
    }

    init() {
        let self = this;
        $.getJSON("res/json/DB/Stock.js")
        .done((data) => {  // Use an arrow function for reasons
            self.inventoryData = data;
            PH.clear();
            _init(self.arg1);
        })
        .fail((jqXHR, textStatus, error) => {
            console.log("getJSON failed, status: " + textStatus + ", error: " + error);
        });

        function _init(element) {
            $(element).append("<div id='notification' style='display: none;'></div>");
            $(element).append("<div id='inventoryContent'>");
            $('#inventoryContent').append("<table id='inventory'>");
            $("#inventory").append("<thead><tr><th>NR</th><th>Name</th><th>Country</th><th>Type</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>")
            .append("<tbody></tbody>")
            .append("</table>");

            $("<button id='inventoryUndo'>Undo</button>").on("click", function() {
                self.inventoryData = buffer.undo("inventory", self.inventoryData)
                self.display();
                console.log(self.inventoryData); // DEBUG
            }).appendTo(element);
            $("<button id='inventoryRedo'>Redo</button>").on("click", function() {
                self.inventoryData = buffer.redo("inventory", self.inventoryData)
                self.display();
                console.log(self.inventoryData); // DEBUG
            }).appendTo(element);
    
            $(element).append("<div id='addItemForm'></div>");
            $("#addItemForm").append("<h2>Add new item</h2>");
            $("#addItemForm").append("<input type='text' id='addItemNr' placeholder='NR'><br><input type='text' id='addItemName' placeholder='Name'><br><input type='text' id='addItemCountry' placeholder='Country'><br><input type='text' id='addItemType' placeholder='Type'><br><input type='number' step='0.01' id='addItemPrice' placeholder='Price'><br><input type='number' id='addItemStock' placeholder='Stock'><br>");
            $("#addItemForm").append("<button id='submitNewItem'>Submit</button>");
            self.display();
        }
    }

    

    display() {
        // Display inventory
        let self = this;
        $('#inventory tbody').empty();
        $.each(self.inventoryData, function(key, val) {
            var rowClass = val.stock < 5 ? 'low-stock' : '';
            var actionButtons = '<button class="edit-item" data-nr="' + val.nr + '">Edit</button> ';
            actionButtons += val.stock > 0 ? '<button class="remove-item" data-nr="' + val.nr + '">Remove</button>' : 'out of stock';
            $('#inventory tbody').append('<tr class="' + rowClass + '"><td>' + val.nr + '</td><td>' + val.name + '</td><td>' + val.country + '</td><td>' + val.type + '</td><td>$' + val.price + '</td><td>' + val.stock + '</td><td>' + actionButtons + '</td></tr>');
        });

        $(".remove-item").on('click', function() {
            var nr = $(this).attr('data-nr');
            self.removeItem(nr);
        });

        $('.edit-item').on('click', function() {
            var nr = $(this).attr('data-nr');
            var newStock = prompt("Please enter the new stock quantity for this item:");
            if (newStock !== null) {
                self.modifyItemStock(nr, parseInt(newStock, 10) - self.inventoryData.find(item => item.nr === nr).stock);
            }
        });

        $('#submitNewItem').on("click", function() {
            var newItem = {
                nr: $('#addItemNr').val(),
                name: $('#addItemName').val(),
                country: $('#addItemCountry').val(),
                type: $('#addItemType').val(),
                price: parseFloat($('#addItemPrice').val()),
                stock: parseInt($('#addItemStock').val(), 10)
            };
            self.addItem(newItem);
        
            // Clear the form
            $('#addItemNr').val('');
            $('#addItemName').val('');
            $('#addItemCountry').val('');
            $('#addItemType').val('');
            $('#addItemPrice').val('');
            $('#addItemStock').val('');
        });
        self.checkLowStock();
    }
    
    // Modify item stock level
    modifyItemStock(nr, amount) {
        let self = this;
        var itemIndex = self.inventoryData.findIndex(item => item.nr === nr);
        if (itemIndex > -1) {
            self.inventoryData[itemIndex].stock += amount;
            buffer.add("inventory", [nr, amount]);
            self.display();
        }
    }

    // Order refills for low stock items
    orderRefills(nr) {
        let self = this;
        // This could be more complex in real life, such as sending an order to a supplier
        var itemIndex = self.inventoryData.findIndex(item => item.nr === nr);
        if (itemIndex > -1 && self.inventoryData[itemIndex].stock < 5) {
            self.inventoryData[itemIndex].stock += 10; // Example refill amount
            self.display();
        }
    }

    // Add a new item to the inventory
    addItem(item) {
        let self = this;
        self.inventoryData.push(item);
        self.display();
    }

    // Remove an item from the inventory
    removeItem(nr) {
        let self = this;
        var itemIndex = self.inventoryData.findIndex(item => item.nr === nr);
        if (itemIndex > -1) {
            self.inventoryData.splice(itemIndex, 1); // Completely remove the item
            self.display();
        }
    }

    checkLowStock() {
        let self = this;
        var lowStockItems = self.inventoryData.filter(item => item.stock < 5 && item.stock > 0);
        if (lowStockItems.length > 0) {
            $('#notification').text('Warning: Some items are low on stock!').show();
        } else {
            $('#notification').hide();
        }
    }

    

    

    // Example usage
    // displayInventory();

    // Example: Modify stock, Order refills, Add item, Remove item
    // modifyItemStock('001', -2); // Sold 2 Guinness Draught
    // orderRefills('002'); // Heineken stock is low, order refills
    // addItem({ nr: "007", name: "New Beer", country: "Germany", type: "Lager", price: 4.5, stock: 20 }); // Add a new beer
    // removeItem('003'); // Remove Budweiser from the menu

}
