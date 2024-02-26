/**
 * @param {Object} todoItem
 */
export function saveTodoItem(todoItem) {
    const items = getTodoItems();
    if (items === null) {
        localStorage.setItem("todo-items", JSON.stringify([todoItem]));
        return;
    }
    items.push(todoItem);
    localStorage.setItem("todo-items", JSON.stringify(items));
}

/**
 * @param {Object} todoItem
 */
export function updateTodoItem(todoItem) {
    const items = getTodoItems();
    if (items === null) {
        localStorage.setItem("todo-items", JSON.stringify([todoItem]));
        return;
    }
    items.find((o, i) => {
        if (o.id === todoItem.id) {
            items[i] = todoItem;
            return true;
        }
    });
    localStorage.setItem("todo-items", JSON.stringify(items));
}

/**
 * @return {Array|null}
 */
export function getTodoItems() {
    const itemString = localStorage.getItem("todo-items");
    if (itemString === null) {
        return null;
    }
    return JSON.parse(itemString);
}

/**
 * @param {number} todoItemId
 */
export function deleteTodoItem(todoItemId) {
    const items = getTodoItems();
    if (items === null) {
        return;
    }
    items.find((o, i) => {
        if (o.id === todoItemId) {
            items.splice(i, 1);
            return true;
        }
    });
    localStorage.setItem("todo-items", JSON.stringify(items));
}
