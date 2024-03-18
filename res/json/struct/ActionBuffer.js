// =====================================================================================================
// Samuel Möller, 2024
//
// This file contains the ActionBuffer class, which is responsible for storing actions in a buffer,
// and for undoing and redoing actions. The buffer is used to store actions for both the order and
// inventory pages. The buffer is a stack, and the buffer size is limited to 50 actions.
// =====================================================================================================

var ubuffer = {}; // Undo buffer
ubuffer['order'] = [];
ubuffer['inventory'] = [];

var rbuffer = {}; // Redo buffer
rbuffer['order'] = []; // [Type, Reference, Action]
rbuffer['inventory'] = [];

// =====================================================================================================
export function getUndo(type) {
    switch (type) {
        case "order":
            return ubuffer['order'];
        case "inventory":
            return ubuffer['inventory'];
        default:
            console.log("Error: Unknown action type");
    }
}

// =====================================================================================================
export function getRedo(type) {
    switch (type) {
        case "order":
            return rbuffer['order'];
        case "inventory":
            return rbuffer['inventory'];
        default:
            console.log("Error: Unknown action type");
    }
}

// =====================================================================================================
export function add(type, action) {
    switch (type) {
        case "order": // It's only possible to add a single item to an order, so the action is the item id
            ubuffer['order'].push(action);
            break;
        case "inventory": // Inventory can have an unknown amount of increments or decrements in one action
            ubuffer['inventory'].push(action);
            break;
        default:
            console.log("Error: Unknown action type");
    }
    if (ubuffer[type].length > 50) { // Limit buffer size to 50
        ubuffer[type].shift();
    }
    rbuffer[type] = [];
}

// =====================================================================================================
export function clear(type) {
    ubuffer[type] = [];
    rbuffer[type] = [];
}

// =====================================================================================================
export function undo(type, ref) {
    if (ubuffer[type].length === 0) {
        console.log("Error: No actions to undo");
        return ref;
    }
    let action = ubuffer[type].pop();
    switch (type) {
        case "order": {
            let id = action[0];
            let amount = action[1];
            if (ref.get(id) > amount) {
                ref.set(id, ref.get(id) - amount);
            } else if (ref.get(id) <= amount) {
                ref.delete(id);
            }
            rbuffer['order'].push(["order", ref, id, amount]);
            break;
        }
        case "inventory": {
            let nr = action[0];
            let amount = action[1] * -1;
            let index = ref.findIndex(item => item.nr === nr);
            if (index > -1) {
                ref[index].stock += amount;
            }
            rbuffer['inventory'].push(action);
            break;
        }
        default:
            console.log("Error: Unknown action type");
    }
    return ref;
}

// =====================================================================================================
export function redo(type, ref) {
    if (rbuffer[type].length === 0) {
        console.log("Error: No actions to redo");
        return ref;
    }
    let action = rbuffer[type].pop();
    switch (type) {
        case "order": {
            let id = action[2];
            let amount = action[3];
            if (!ref.has(id)) { // If the reference does not have the key
                ref.set(id, amount); // Add the key with value 1
            } else if (ref.get(id) > 0) { // If the reference has the key
                ref.set(id, ref.get(id) + amount); // Increment the value
            }
            ubuffer['order'].push([id, amount]);
            break;
        }
        case "inventory": {
            let nr = action[0];
            let amount = action[1];
            let index = ref.findIndex(item => item.nr === nr);
            if (index > -1) {
                ref[index].stock += amount;
            }
            ubuffer['inventory'].push(action);
            break;
        }
        default:
            console.log("Error: Unknown action type");
    }
    return ref;
}
