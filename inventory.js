$(document).ready(function() {
    // Display inventory
    function displayInventory() {
        $('#inventory tbody').empty();
        inventoryData.forEach(function(item) {
            var rowClass = item.stock < 5 ? 'low-stock' : '';
            var actionButtons = '<button class="edit-item" data-nr="' + item.nr + '">Edit</button> ';
            actionButtons += item.stock > 0 ? '<button class="remove-item" data-nr="' + item.nr + '">Remove</button>' : 'out of stock';
            $('#inventory tbody').append('<tr class="' + rowClass + '"><td>' + item.nr + '</td><td>' + item.name + '</td><td>' + item.country + '</td><td>' + item.type + '</td><td>$' + item.price + '</td><td>' + item.stock + '</td><td>' + actionButtons + '</td></tr>');
        });
        checkLowStock();
    }

    // Modify item stock level
    function modifyItemStock(nr, amount) {
        var itemIndex = inventoryData.findIndex(item => item.nr === nr);
        if (itemIndex > -1) {
            inventoryData[itemIndex].stock += amount;
            displayInventory();
        }
    }

    // Order refills for low stock items
    function orderRefills(nr) {
        // This could be more complex in real life, such as sending an order to a supplier
        var itemIndex = inventoryData.findIndex(item => item.nr === nr);
        if (itemIndex > -1 && inventoryData[itemIndex].stock < 5) {
            inventoryData[itemIndex].stock += 10; // Example refill amount
            displayInventory();
        }
    }

    // Add a new item to the inventory
    function addItem(item) {
        inventoryData.push(item);
        displayInventory();
    }

    // Remove an item from the inventory
    function removeItem(nr) {
        var itemIndex = inventoryData.findIndex(item => item.nr === nr);
        if (itemIndex > -1) {
            inventoryData.splice(itemIndex, 1); // Completely remove the item
            displayInventory();
        }
    }

    function checkLowStock() {
        var lowStockItems = inventoryData.filter(item => item.stock < 5 && item.stock > 0);
        if (lowStockItems.length > 0) {
            $('#notification').text('Warning: Some items are low on stock!').show();
        } else {
            $('#notification').hide();
        }
    }

    $(document).on('click', '.remove-item', function() {
        var nr = $(this).data('nr');
        removeItem(nr);
    });

    $('#submitNewItem').click(function() {
        var newItem = {
            nr: $('#addItemNr').val(),
            name: $('#addItemName').val(),
            country: $('#addItemCountry').val(),
            type: $('#addItemType').val(),
            price: parseFloat($('#addItemPrice').val()),
            stock: parseInt($('#addItemStock').val(), 10)
        };
        addItem(newItem);
    
        // Clear the form
        $('#addItemNr').val('');
        $('#addItemName').val('');
        $('#addItemCountry').val('');
        $('#addItemType').val('');
        $('#addItemPrice').val('');
        $('#addItemStock').val('');
    });

    $(document).on('click', '.edit-item', function() {
        var nr = $(this).data('nr');
        var newStock = prompt("Please enter the new stock quantity for this item:");
        if (newStock !== null) {
            modifyItemStock(nr, parseInt(newStock, 10) - inventoryData.find(item => item.nr === nr).stock);
        }
    });

    // Example usage
    displayInventory();

    // Example: Modify stock, Order refills, Add item, Remove item
    // modifyItemStock('001', -2); // Sold 2 Guinness Draught
    // orderRefills('002'); // Heineken stock is low, order refills
    // addItem({ nr: "007", name: "New Beer", country: "Germany", type: "Lager", price: 4.5, stock: 20 }); // Add a new beer
    // removeItem('003'); // Remove Budweiser from the menu
});
