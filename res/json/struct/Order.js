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
    set(key, val) {
        let self = this;
        self.items.set(key, val);
    }

// =====================================================================================================
    add(item, num) {
        let self = this;
        if (self.items.has(item)) { self.items.set(item, self.items.get(item) + num); // Increment item count if it exists
        } else { self.items.set(item, num); } // Add item to map if it doesn't exist
        return self.items.get(item);
    }

// =====================================================================================================
    remove(item, num) {
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
    print() {   // DEPRECATED
        let self = this;
        let total = 0;
        self.items.forEach(function(key, val) { // Iterate over items in order
            console.log(key + ": " + val); // Print item and count (should be replaced with model method call)
            total += val;
        });
        if (total > 0) { console.log("Total: " + total);
        } else { console.log("No items in order") }
        if (total > 20) { console.log("Damn, bro"); } // im thoisty
    }
}