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
        case "order":
            ubuffer['order'].push(action);
            break;
        case "inventory":
            ubuffer['inventory'].push(action);
            break;
        default:
            console.log("Error: Unknown action type");
    }
    if (ubuffer[type].length > 50) {
        ubuffer[type].shift();
    }
}

// =====================================================================================================
export function undo(type, ref) {
    if (ubuffer[type].length === 0) {
        console.log("Error: No actions to undo");
        return ref;
    }
    let action = "";
    switch (type) {
        case "order":
            let id = ubuffer['order'].pop();
            if (ref.get(id) > 1) {
                ref.set(id, ref.get(id) - 1);
            } else if (ref.get(id) === 1) {
                ref.delete(id);
            }
            action = ["order", ref, id];
            rbuffer['order'].push(action);
            break;
        case "inventory":
            action = ubuffer['inventory'].pop();
            rbuffer['inventory'].push(action);
            break;
        default:
            console.log("Error: Unknown action type");
    }
    return ref;
}

// =====================================================================================================
export function redo(type) {
    let action = "";
    switch (type) {
        case "order":
            action = rbuffer['order'].pop();
            ubuffer['order'].push(action[1]);
            break;
        case "inventory":
            action = rbuffer['inventory'].pop();
            ubuffer['inventory'].push(action);
            break;
        default:
            console.log("Error: Unknown action type");
    }
}
