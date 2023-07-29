/**
 * Displays a specific todo in a modal based on the provided id.
 *
 * @function
 * @param {number} id - The id of the todo to be displayed.
 * @returns {void} No return value.
 */
function showTodo(id) {
    const todo = todos.find(t => t['id'] === id);
    let modalTodo = document.getElementById('showTodo');
    modalTodo.classList.remove('displayNone');
    modalTodo.innerHTML = '';
    modalTodo.innerHTML = ``;
    modalTodo.innerHTML += generateToDoHTMLModal(todo); 
}

/**
 * Generates HTML for the modal view of a todo.
 *
 * @function
 * @param {Object} todo - The todo object.
 * @returns {string} HTML string representing the todo.
 */
function generateToDoHTMLModal(todo) {
    return /*html*/ `
    <div class="modal-content">
            <div onclick="closeModalBord()" class="modal-close">
                <img src="./assets/img/close-icon.png" alt="">
            </div>
    <h4 class="modal-category">${todo['task-category']}</h4>
    <h3 class="modal-title">${todo['title']}</h3>
    <p class="modal-date"><b>Due date:</b> ${todo['date']}</p>
    <p class="modal-priority"><b>Priority:</b> ${todo['text']}</p>
    <div class="modal-members">
        <p><b>Assigned To:</b></p>
         <p>${todo['members']}</p>
    </div>
    <div onclick="deleteTodo(${todo['id']})" class="todo-delete">
            <img src="./assets/img/delete.png" alt="">
    </div>
    </div>`;
}

/**
 * Hides the modal.
 *
 * @function
 * @returns {void} No return value.
 */
function closeModalBord() {
    let modalTodo = document.getElementById('showTodo');
    modalTodo.classList.add('displayNone');
}

/**
 * Deletes a todo based on its id and updates the local storage.
 *
 * @async
 * @function
 * @param {number} todo - The id of the todo to be deleted.
 * @returns {Promise<void>} No return value.
 */
async function deleteTodo(todo) {
    let index = todo;
    let addTasks = JSON.parse(await getItem('task'));
    todos.splice(index, 1);
    addTasks.splice(index, 1);
    await setItem('task', JSON.stringify(addTasks));
    for (let i = 0; i < todos.length; i++) {
        todos[i]['id'] = i;
    }
    await setItemTodo();
    closeModalBord();
    initBoard();
}



