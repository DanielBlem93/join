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
    let subtasksHTML = '';
    if (todo.subtasks && todo.subtasks.length > 0) {
        todo.subtasks.forEach((subtaskObj, index) => {
            console.log(subtaskObj.subtask);
            subtasksHTML += /*html*/`
                <div class="todo-subtask">
                    <input type="checkbox" id="subtask${index}" ${subtaskObj.isComplete ? 'checked' : ''} onclick="toggleSubtask(${todo.id}, ${index})">
                    <label for="subtask${index}">${subtaskObj.subtask}</label>
                </div>
            `;
        });
    }

    let membersHTML = '';
    if (todo.members && todo.members.length > 0) {
        todo.members.forEach((member) => {
            let color = getRandomColor();
            let names = member.split(' ');
            let initials = names[0][0] + names[1][0];
            membersHTML += `<p class="modalMember"><span class="initMember" style="background-color:${color}";>${initials}</span>  ${member}</p>`;
        });
    }

    return /*html*/ `
    <div class="modal-content">
        <div onclick="closeModalBord()" class="modal-close">
            <img src="./assets/img/close-icon.png" alt="">
        </div>
        <h4 class="modal-category">${todo['task-category']}</h4>
        <h3 class="modal-title">${todo['title']}</h3>
        <p class="modal-text"> ${todo['text']}</p>
        <p class="modal-date"><b>Due date:</b> ${todo['date']}</p>
        <div class="modal-tasks"> ${subtasksHTML}</div>
        <p class="modal-priority"><b>Priority:</b> <span id="priority">${todo['priority']}</span></p>
        <div class="modal-members">
            <p><b>Assigned To:</b></p>
            ${membersHTML}
        </div>
        <div onclick="deleteTodo(${todo['id']})" class="todo-delete">
            <img src="./assets/img/delete.png" alt="">
        </div>
        <div onclick="editTodo(${todo['id']})" class="todo-edit">
            <img src="./assets/img/editweiss.png" alt="">
        </div>
    `;
}


function toggleSubtask(todoId, subtaskId) {
    let todo = todos.find(t => t.id === todoId);
    if (todo && todo.subtasks && todo.subtasks[subtaskId]) {
        todo.subtasks[subtaskId].isComplete = !todo.subtasks[subtaskId].isComplete;
        updateHTML();
    }
}


// function getPriorityColor(priority) {
//     switch (priority) {
//         case 'urgent': return 'red';
//         case 'medium': return 'orange';
//         case 'low': return 'yellow';
//         default: return 'white';
//     }
// }
async function editTodo (id) {
let contacts = JSON.parse(await getItem('contacts'));
console.log(todos[id]);
    //let todo = todos[id];
    const editTodoModal = document.getElementById('editTodoModal');
    editTodoModal.style.right = '0';
    const editTodoBox = document.createElement('div');
    editTodoBox.classList.add('editTodoBox');
    editTodoModal.appendChild(editTodoBox);
    let contactsOptions = contacts.map(contact => `<option value="${contact}" ${todo['assign'] === contact ? 'selected' : ''}>${contact.name}</option>`).join('\n');

    editTodoBox.innerHTML += /*html*/ `
        <div class="editTitle">
            <h3 class="modal-title-edit">Title:</h3>
            <input type="text" id="editTitle" value="${todo['title']}">
        </div>
        <div class="editDescription">
            <h3 class="modal-title-edit">Description:</h3>
            <textarea name="" id="" cols="30" rows="5">${todo['text']}</textarea>
        </div>
        <div class="editDate">
            <h3 class="modal-title-edit">Date:</h3>
            <input type="date" id="editDate" value="${todo['date']}">
        </div>
        <div class="editPrio">
            <h3 class="modal-title-edit">Prio:</h3>
            <div class="editPrio">
                <div class="prio" style="border-radius: 10px;
                                         padding: 10px 20px; 
                                         background-color: ${todo['priority'] === 'urgent' ? getPriorityColor('urgent') : ''};
                                          color: ${todo['priority'] === 'urgent' ? 'white' : 'black'}" id="editUrgent">Urgent</div>
                <div class="prio" style="border-radius: 10px; 
                                        padding: 10px 20px; 
                                        background-color: ${todo['priority'] === 'medium' ? getPriorityColor('medium') : ''};
                                        color: ${todo['priority'] === 'medium' ? 'white' : 'black'}" id="editMedium">Medium</div>
                <div class="prio" style="border-radius: 10px;
                                        padding: 10px 20px;
                                        background-color: ${todo['priority'] === 'low' ? getPriorityColor('low') : ''};
                                        color: ${todo['priority'] === 'low' ? 'white' : 'black'}" id="editLow">Low</div>
            </div>
        </div>
        <div class="editAssign">
            <h3 class="modal-title-edit">Assign to:</h3>
            <select id="editAssign">
                ${contactsOptions}
            </select>
        </div>
        <div>
            <button class="editClose" onclick="closeEditModal()">
                <img src="./assets/img/close-icon.png">
            </button>
        </div>
        <div class="editSubtasks">
            <button onclick="saveTodo(todo)" id="saveAll" class="editOk">OK</button>
        </div>
    `;
        
    document.getElementById('saveAll').addEventListener('click', function() {
            let title = document.getElementById('editTitle');
            let description = document.querySelector('.editDescription textarea');
            let date = document.getElementById('editDate');
            let assign = document.getElementById('editAssign');

            let updatedTodo = {
                title: title.value,
                text: description.value,
                date: date.value,
                assign: assign.value,
                priority: todo['priority'],
            };
            todos[id] = updatedTodo;
            updateTodo(id, todo);
            updateHTML();
            closeEditModal();
        });
    
}



async function updateTodo(id, updatedTodo) {
    todos[id] = updatedTodo;  
    await editTodo(id); 
}


function closeEditModal() {
    let editTodoModal = document.getElementById('editTodoModal');
    editTodoModal.style.right = '-200%';
    editTodoModal.innerHTML = '';
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



