import {saveTodoItem, getTodoItems, deleteTodoItem, updateTodoItem} from "./StorageManager.js";

const content = document.getElementById('content');
const titleInput = document.getElementById('title-input');
const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;

let nothingElement = document.getElementById('nothing');
let todoItemId = 0;

/**
 * @param {String} title
 * @param {boolean} dontSave
 */
function createTodoItem(title, dontSave = false) {
    title = title.trim();

    if (title === "") {
        return;
    }

    todoItemId += 1;
    const todoItem = {
        id: todoItemId,
        title: title,
        completed: false,
    };

    addTodoItemToUI(todoItem);

    if (!dontSave) {
        saveTodoItem(todoItem);
    }
}

/**
 * @param {Object} todoItem
 */
function addTodoItemToUI(todoItem) {
    if (nothingElement !== null) {
        nothingElement.remove();
        nothingElement = null;
    }

    const listItem = document.createElement('li');
    listItem.innerText = todoItem.title;
    listItem.classList.add('todoItem', 'glassomorphic');

    const div = document.createElement('div');
    div.classList.add('button-container');

    const label = document.createElement('label');
    label.classList.add('glass-checkbox-label', 'glassomorphic');
    label.setAttribute("for", `checkbox-${todoItem.id}`);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = todoItem.completed;
    checkBox.id = `checkbox-${todoItem.id}`;
    checkBox.classList.add('glass-checkbox')
    checkBox.addEventListener('change', event => {
        todoItem.completed = event.target.checked;
        updateTodoItem(todoItem);
    });

    div.appendChild(checkBox);
    div.appendChild(label);


    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = deleteIcon;
    deleteButton.classList.add('image-button');
    deleteButton.addEventListener('click', () => {
        listItem.classList.add('fadeout');
        setTimeout(_ => {
            listItem.remove()
        }, 300);
        deleteTodoItem(todoItem.id);
    });
    div.appendChild(deleteButton);

    listItem.appendChild(div);

    content.appendChild(listItem);
}

document.getElementById('add-new-todo-item-button').addEventListener('click', () => {
    const itemTitle = titleInput.value;
    createTodoItem(itemTitle);
    titleInput.value = "";
});

titleInput.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        const itemTitle = titleInput.value;
        createTodoItem(itemTitle);
        titleInput.value = "";
    }
});

const items = getTodoItems();
if (items !== null) {
    items.forEach(item => {
        addTodoItemToUI(item);
        todoItemId = item.id;
    });
}
