$(document).ready(function() {

    function percentToNumber(percentStr) {
        return Number(percentStr.slice(0,-1));
    }

    function allDrinksInformation(type, strength) {

        // Using a local variable to collect the items.
        var collector = [];
    
        // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
        // items, you may introduce filter functions in the loop... see the template within comments.
        //
        if (type == 'regular') {
            for (i = 0; i < DB2.spirits.length; i++) {
                collector.push([DB2.spirits[i].namn,
                                DB2.spirits[i].argang,
                                DB2.spirits[i].producent,
                                DB2.spirits[i].ursprunglandnamn,
                                DB2.spirits[i].varugrupp,
                                DB2.spirits[i].alkoholhalt,
                                DB2.spirits[i].modul,
                                DB2.spirits[i].ekologisk,
                                DB2.spirits[i].forpackning,
                                DB2.spirits[i].prisinklmoms]);
                };
        }
        else if (type == 'strong') {
            for (i = 0; i < DB2.spirits.length; i++) {

                // We check if the percentage alcohol strength stored in the data base is lower than the
                // given limit strength. If the limit is set to 14, also liqueuers are listed.
                //
                if (percentToNumber(DB2.spirits[i].alkoholhalt) > strength) {
                    collector.push([DB2.spirits[i].namn,
                        DB2.spirits[i].argang,
                        DB2.spirits[i].producent,
                        DB2.spirits[i].ursprunglandnamn,
                        DB2.spirits[i].varugrupp,
                        DB2.spirits[i].alkoholhalt,
                        DB2.spirits[i].modul,
                        DB2.spirits[i].ekologisk,
                        DB2.spirits[i].forpackning,
                        DB2.spirits[i].prisinklmoms]);
                };
            };
        }
        
        console.log(collector); // Log the collected data to the console
        return collector;
    }

    // Generate the HTML table for the Show All Beverages button
    $("#showAllBeveragesBtn").click(function() {
        var beverages = allDrinksInformation('regular', 0);
        var tableHtml = '<table border="1"><tr><th>Name</th><th>Production Year </th><th>Producer</th><th>Country of Origin</th><th>Category</th><th>Alcohol Strenght</th><th>Grape</th><th>Ecologic</th><th>Serving Size</th><th>Price</th></tr>';
        for (var i = 0; i < beverages.length; i++) {
            tableHtml += '<tr>';
            tableHtml += '<td>' + (beverages[i][0] || '') + '</td>'; // namn
            tableHtml += '<td>' + (beverages[i][1] || '') + '</td>'; // productionyear
            tableHtml += '<td>' + (beverages[i][2] || '') + '</td>'; // producer
            tableHtml += '<td>' + (beverages[i][3] || '') + '</td>'; // countryoforiginlandname
            tableHtml += '<td>' + (beverages[i][4] || '') + '</td>'; // catgegory
            tableHtml += '<td>' + (beverages[i][5] || '') + '</td>'; // alcoholstrength
            tableHtml += '<td>' + (beverages[i][6] || '') + '</td>'; // module
            tableHtml += '<td>' + (beverages[i][7] || '') + '</td>'; // organic
            tableHtml += '<td>' + (beverages[i][8] || '') + '</td>'; // packaging
            tableHtml += '<td>' + (beverages[i][9] || '') + '</td>'; // priceinclvat
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        $("#menuContainer").html(tableHtml);
    });

    // Generate the HTML table for the Show All Strong Beverages button
    $("#showAllStrongBeveragesBtn").click(function() {
        var beverages = allDrinksInformation('strong', 20);
        var tableHtml = '<table border="1"><tr><th>Name</th><th>Year</th><th>Producer</th><th>Country of Origin</th><th>Category</th><th>Alcohol Strenght</th><th>Grape</th><th>Ecologic</th><th>Serving Size</th><th>Price</th></tr>';
        for (var i = 0; i < beverages.length; i++) {
            tableHtml += '<tr>';
            tableHtml += '<td>' + (beverages[i][0] || '') + '</td>'; // namn
            tableHtml += '<td>' + (beverages[i][1] || '') + '</td>'; // productionyear
            tableHtml += '<td>' + (beverages[i][2] || '') + '</td>'; // producer
            tableHtml += '<td>' + (beverages[i][3] || '') + '</td>'; // countryoforiginlandname
            tableHtml += '<td>' + (beverages[i][4] || '') + '</td>'; // catgegory
            tableHtml += '<td>' + (beverages[i][5] || '') + '</td>'; // alcoholstrength
            tableHtml += '<td>' + (beverages[i][6] || '') + '</td>'; // module
            tableHtml += '<td>' + (beverages[i][7] || '') + '</td>'; // organic
            tableHtml += '<td>' + (beverages[i][8] || '') + '</td>'; // packaging
            tableHtml += '<td>' + (beverages[i][9] || '') + '</td>'; // priceinclvat
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        $("#menuContainer").html(tableHtml);
    });
});