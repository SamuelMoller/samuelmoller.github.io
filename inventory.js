$(document).ready(function() {
    var inventoryData = [
        {"nr": "001", "name": "Guinness Draught", "country": "Ireland", "type": "Stout", "price": 5, "stock": 10},
        {"nr": "002", "name": "Heineken", "country": "Netherlands", "type": "Lager", "price": 4.5, "stock": 3},
        {"nr": "003", "name": "Budweiser", "country": "United States", "type": "Lager", "price": 4, "stock": 20},
        {"nr": "004", "name": "Corona Extra", "country": "Mexico", "type": "Pale Lager", "price": 4.5, "stock": 12},
        {"nr": "005", "name": "Stella Artois", "country": "Belgium", "type": "Pilsner", "price": 5, "stock": 18},
        {"nr": "006", "name": "Hoegaarden", "country": "Belgium", "type": "Wheat Beer", "price": 5, "stock": 8}
    ];

    function displayInventory() {
        $('#inventory tbody').empty();
        inventoryData.forEach(function(item) {
            var rowClass = item.stock < 5 ? 'low-stock' : '';
            var actionButton = item.stock > 0 ? '<button class="remove-item" data-nr="' + item.nr + '">Remove</button>' : 'Out of Stock';
            $('#inventory tbody').append('<tr class="' + rowClass + '"><td>' + item.nr + '</td><td>' + item.name + '</td><td>' + item.country + '</td><td>' + item.type + '</td><td>$' + item.price + '</td><td>' + item.stock + '</td><td>' + actionButton + '</td></tr>');
        });
        checkLowStock();
    }

    function removeItem(nr) {
        var itemIndex = inventoryData.findIndex(item => item.nr === nr);
        if (itemIndex > -1) {
            inventoryData[itemIndex].stock = 0; // Assuming remove means setting stock to 0
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

    displayInventory();
});