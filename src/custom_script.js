$(document).ready(function() {
    // Generate the HTML table for the Show All Beverages button
    $("#showAllBeveragesBtn").click(function() {
        var beverages = allBeverages();
        var tableHtml = '<table border="1"><tr><th>Name</th><th>Category</th></tr>';
        for (var i = 0; i < beverages.length; i++) {
            tableHtml += '<tr><td>' + beverages[i][0] + '</td><td>' + beverages[i][1] + '</td></tr>';
        }
        tableHtml += '</table>';
        $("#menuContainer").html(tableHtml);
    });

    // Generate the HTML table for the Show All Strong Beverages button
    $("#showAllStrongBeveragesBtn").click(function() {
        var beverages = allStrongBeverages(20);
        var tableHtml = '<table border="1"><tr><th>Name</th><th>Category</th></tr>';
        for (var i = 0; i < beverages.length; i++) {
            tableHtml += '<tr><td>' + beverages[i][0] + '</td><td>' + beverages[i][1] + '</td></tr>';
        }
        tableHtml += '</table>';
        $("#menuContainer").html(tableHtml);
    });
});