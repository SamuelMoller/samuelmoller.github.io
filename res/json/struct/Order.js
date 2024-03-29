// =====================================================================================================
// Design, implementation, styling, and polish: Samuel Möller
//
// This file contains the Order class, which is responsible for mapping items to an order, adding
// and removing items from the order, and printing the order.
// =====================================================================================================

export class Order {
    constructor() {
        this.items = new Map(); // Create a map to store items in the order
    }

// =====================================================================================================
    set(key, val) { // Unused
        /* Set a key-value pair in the order. */
        let self = this;
        self.items.set(key, val);
    }

// =====================================================================================================
    add(item, num) {
        /* Add an item to the order. */
        let self = this;
        if (self.items.has(item)) { self.items.set(item, self.items.get(item) + num); // Increment item count if it exists
        } else { self.items.set(item, num); } // Add item to map if it doesn't exist
        return self.items.get(item);
    }

// =====================================================================================================
    remove(item, num) {
        /* Remove an item from the order. */
        let self = this;
        if (self.items.has(item)) {
            if (num > self.items.get(item)) {
                self.items.set(item, 0)
            } else {
                self.items.set(item, self.items.get(item) - num); // Decrement item count if it exists
            }
        } else {
            console.log("Item not in order"); } // Print error message if item doesn't exist
        return self.items.get(item);
    }

// =====================================================================================================
    _debugPrint() {
        /* Print the order. */
        let self = this;
        let total = 0;
        self.items.forEach(function(key, val) { // Iterate over items in order
            console.log(val + ": " + key); // Print item and count (should be replaced with model method call)
            total += key;
        });
        if (total > 0) { console.log("Total: " + total);
        } else { console.log("No items in order") }
        if (total > 20) { console.log("Damn, bro"); } // im thoisty
    }
}