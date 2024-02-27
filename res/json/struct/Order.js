// =====================================================================================================
// Samuel Möller, 2024
// 
// This file contains the Order class, which is responsible for mapping items to an order, adding
// and removing items from the order, and printing the order.
// =====================================================================================================

export class Order {
    constructor() {
        this.items = new Map(); // Create a map to store items in the order
    }

// =====================================================================================================
    addItem(item) {
        let self = this;
        if (self.items.has(item)) { self.items.set(item, self.items.get(item) + 1); // Increment item count if it exists
        } else { self.items.set(item, 1); } // Add item to map if it doesn't exist, set count to 1
        return self.items.get(item);
    }

// =====================================================================================================
    removeItem(item) {
        let self = this;
        if (self.items.has(item)) { self.items.set(item, self.items.get(item) - 1); // Decrement item count if it exists
        } else { console.log("Item not in order"); } // Print error message if item doesn't exist
        return self.items.get(item);
    }

// =====================================================================================================
    printOrder() {
        let self = this;
        let total = 0;
        self.items.forEach(function(value, key) { // Iterate over items in order
            if (value > 0) {
                console.log(key + ": " + value); // Print item and count (should be replaced with model method call)
                total += value;
            }
        });
        if (total > 0) { console.log("Total: " + total); 
        } else { console.log("No items in order") }
        if (total > 20) { console.log("Damn, bro"); } // im thoisty
    }
}