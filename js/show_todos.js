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

function generateSubtaskHTML(subtaskObj, index, todoId) {
    let isChecked = subtaskObj.isComplete ? 'checked' : '';
    let subtaskHTML = /*html*/ `
        <div class="todo-subtask">
            <input type="checkbox" id="subtask${index}" ${isChecked} onclick="toggleSubtask(${todoId}, ${index})">
            <label for="subtask${index}">${subtaskObj.subtask}</label>
        </div>
    `;
    return subtaskHTML;
}

function generateMemberHTML(member) {
    // Zerlege den String, um den Namen und die Farbe zu extrahieren.
    let splitMember = member.split(' rgb(');
    let name = splitMember[0];
    let color = splitMember[1] ? "rgb(" + splitMember[1] : getRandomColor(); // Falls kein RGB-Wert angegeben ist, nutzen Sie getRandomColor.

    // Zerlege den Namen, um die Initialen zu extrahieren.
    let names = name.split(' ');
    let initials = names[0][0] + (names[1] ? names[1][0] : ''); // Fügt das erste Zeichen des zweiten Namens hinzu, falls vorhanden.

    let memberHTML = `<p class="modalMember"><span class="initMember" style="background-color:${color}">${initials}</span> ${name}</p>`;
    return memberHTML;
}


function generateToDoHTMLModal(todo) {
    let subtasksHTML = '';
    let color = getColorVariable(todo['task-color']);
    if (todo.subtasks && todo.subtasks.length > 0) {
        subtasksHTML = todo.subtasks.map((subtaskObj, index) => generateSubtaskHTML(subtaskObj, index, todo.id)).join('');
    }

    let colorTodosPriorities = todo['priority'] === 'urgent' ? '#FF0000' : todo['priority'] === 'medium' ? '#FFA800' : todo['priority'] === 'low' ? '#7AE229' : '#321313';
    let imgTodosPriorities = todo['priority'] === 'urgent' ? './assets/img/urgent.svg' : todo['priority'] === 'medium' ? './assets/img/mediumweiss.png' : todo['priority'] === 'low' ? './assets/img/lowweiss.png' : './assets/img/lowweiss.png';
    let membersHTML = '';
    if (todo.members && todo.members.length > 0) {
        membersHTML = todo.members.map(member =>  generateMemberHTML(member)).join('');
    }

    let todoHTML = /*html*/ `
    <div class="modal-content">
        <div onclick="closeModalBord()" class="modal-close">
            <img src="./assets/img/close-icon.png" alt="">
        </div>
        <h4 style="background-color: ${color}" class="modal-category">${todo['task-category']}</h4>
        <h3 class="modal-title">${todo['title']}</h3>
        <p class="modal-text"> ${todo['text']}</p>
        <p class="modal-date"><b>Due date:</b> ${todo['date']}</p>
        <div class="modal-tasks"> ${subtasksHTML}</div>
        <p class="modal-priority"><b>Priority:</b> 

           <span style="background-color: ${colorTodosPriorities};" id="priority">${todo['priority']}
            <img style="width: 20px;" src="${imgTodosPriorities}" alt="">
            </span>
        </p>
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
    return todoHTML;
}


function toggleSubtask(todoId, subtaskId) {
    let todo = todos.find(t => t.id === todoId);
    if (todo && todo.subtasks && todo.subtasks[subtaskId]) {
        todo.subtasks[subtaskId].isComplete = !todo.subtasks[subtaskId].isComplete;
        updateHTML();
    }
}


async function editTodo (id) {
    let contacts = JSON.parse(await getItem('contacts'));
    let todo = todos[id];
    const editTodoModal = document.getElementById('editTodoModal');
    editTodoModal.style.right = '0';
    const editTodoBox = document.createElement('div');
    editTodoBox.classList.add('editTodoBox');
    editTodoModal.appendChild(editTodoBox);

    editTodoBox.innerHTML += /*html*/ `
        <div class="addTaskTitle">
                <span class="typography2T6">Title</span>
                <div class=" input-container">
                    <input id="title" type="text" class="captions inputFrame" placeholder="Enter a Title" value="${todo['title']}">
                </div>
                <span class="is-required displayNone">This field is required</span>
            </div>
        <div class="addTaskDescription">
                <span class="typography2T6">Description</span>
                <div class="textarea-container">
                    <textarea id="description" class="captions textareaFrame"
                        placeholder="Enter a Description">${todo['text']}</textarea>
                    <img class="addTaskFrame17Recurso11" src="./assets/img/recurso-11.svg">
                </div>
                <span class="is-required displayNone">This field is required</span>
            </div>
            <div class="addTaskDueDate">
                    <span class="typography2T6">Due date</span>
                    <div class=" input-container">
                        <input id="date" type="date" class="captions inputFrame" placeholder="dd/mm/yyyy"
                            min="2023-01-01" value="${todo['date']}">
                    </div>
                    <span class="is-required displayNone">This field is required</span>
                </div>
                <div class="addTaskFrame28">
                    <span class="typography2T6">Prio</span>

                    <div class="addTaskPriority">
                        <button id="addTaskBtnUrgent" onclick="changeColor('addTaskBtnUrgent','urgent')"
                            class="input-containerPrio buttonFramePrio">
                            <span class="typography2T6">Urgent</span>
                            <svg width="21" height="15" viewBox="0 0 21 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="Prio alta" clip-path="url(#clip0_70119_2621)">
                                    <g id="Capa 2">
                                        <g id="Capa 1">
                                            <path id="Vector"
                                                d="M19.4043 14.7547C19.1696 14.7551 18.9411 14.6803 18.7522 14.5412L10.5001 8.458L2.24809 14.5412C2.13224 14.6267 2.00066 14.6887 1.86086 14.7234C1.72106 14.7582 1.57577 14.7651 1.43331 14.7437C1.29084 14.7223 1.15397 14.6732 1.03053 14.599C0.907083 14.5247 0.799474 14.427 0.713845 14.3112C0.628216 14.1954 0.566244 14.0639 0.531467 13.9243C0.49669 13.7846 0.48979 13.6394 0.51116 13.497C0.554319 13.2095 0.71001 12.9509 0.943982 12.7781L9.84809 6.20761C10.0368 6.06802 10.2654 5.99268 10.5001 5.99268C10.7349 5.99268 10.9635 6.06802 11.1522 6.20761L20.0563 12.7781C20.2422 12.915 20.3801 13.1071 20.4503 13.327C20.5204 13.5469 20.5193 13.7833 20.4469 14.0025C20.3746 14.2216 20.2349 14.4124 20.0476 14.5475C19.8604 14.6826 19.6352 14.7551 19.4043 14.7547Z"
                                                fill="#FF3D00" />
                                            <path id="Vector_2"
                                                d="M19.4043 9.00568C19.1696 9.00609 18.9411 8.93124 18.7522 8.79214L10.5002 2.70898L2.2481 8.79214C2.01412 8.96495 1.72104 9.0378 1.43331 8.99468C1.14558 8.95155 0.886785 8.79597 0.713849 8.56218C0.540914 8.32838 0.468006 8.03551 0.511165 7.74799C0.554324 7.46048 0.710015 7.20187 0.943986 7.02906L9.8481 0.458588C10.0368 0.318997 10.2654 0.243652 10.5002 0.243652C10.7349 0.243652 10.9635 0.318997 11.1522 0.458588L20.0563 7.02906C20.2422 7.16598 20.3801 7.35809 20.4503 7.57797C20.5204 7.79785 20.5193 8.03426 20.447 8.25344C20.3746 8.47262 20.2349 8.66338 20.0476 8.79847C19.8604 8.93356 19.6352 9.00608 19.4043 9.00568Z"
                                                fill="#FF3D00" />
                                        </g>
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="clip0_70119_2621">
                                        <rect width="20" height="14.5098" fill="white"
                                            transform="translate(0.5 0.245117)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                        <button id="addTaskBtnMedium" onclick="changeColor('addTaskBtnMedium', 'medium')"
                            class="input-containerPrio buttonFramePrio">
                            <span class="typography2T6">Medium</span>
                            <svg width="20" height="9" viewBox="0 0 20 9" xmlns="http://www.w3.org/2000/svg">
                                <g id="Prio media" clip-path="url(#clip0_70119_2628)">
                                    <g id="Capa 2">
                                        <g id="Capa 1">
                                            <path id="Vector"
                                                d="M18.9041 8.22528H1.09589C0.805242 8.22528 0.526498 8.10898 0.320979 7.90197C0.11546 7.69495 0 7.41419 0 7.12143C0 6.82867 0.11546 6.5479 0.320979 6.34089C0.526498 6.13388 0.805242 6.01758 1.09589 6.01758H18.9041C19.1948 6.01758 19.4735 6.13388 19.679 6.34089C19.8845 6.5479 20 6.82867 20 7.12143C20 7.41419 19.8845 7.69495 19.679 7.90197C19.4735 8.10898 19.1948 8.22528 18.9041 8.22528Z"
                                                fill="#FFA800" />
                                            <path id="Vector_2"
                                                d="M18.9041 2.98211H1.09589C0.805242 2.98211 0.526498 2.86581 0.320979 2.6588C0.11546 2.45179 0 2.17102 0 1.87826C0 1.5855 0.11546 1.30474 0.320979 1.09772C0.526498 0.890712 0.805242 0.774414 1.09589 0.774414L18.9041 0.774414C19.1948 0.774414 19.4735 0.890712 19.679 1.09772C19.8845 1.30474 20 1.5855 20 1.87826C20 2.17102 19.8845 2.45179 19.679 2.6588C19.4735 2.86581 19.1948 2.98211 18.9041 2.98211Z"
                                                fill="#FFA800" />
                                        </g>
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="clip0_70119_2628">
                                        <rect width="20" height="7.45098" fill="white"
                                            transform="translate(0 0.774414)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                        <button id="addTaskBtnLow" onclick="changeColor('addTaskBtnLow', 'low')"
                            class="input-containerPrio buttonFramePrio">
                            <span class="typography2T6">Low</span>
                            <svg width="20" height="15" viewBox="0 0 20 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="Prio baja">
                                    <g id="Capa 2">
                                        <g id="Capa 1">
                                            <path id="Vector"
                                                d="M10 9.00614C9.7654 9.00654 9.53687 8.9317 9.34802 8.79262L0.444913 2.22288C0.329075 2.13733 0.231235 2.02981 0.15698 1.90647C0.0827245 1.78313 0.033508 1.64638 0.0121402 1.50404C-0.031014 1.21655 0.0418855 0.923717 0.214802 0.689945C0.387718 0.456173 0.646486 0.300615 0.934181 0.257493C1.22188 0.21437 1.51493 0.287216 1.74888 0.460004L10 6.54248L18.2511 0.460004C18.367 0.374448 18.4985 0.312529 18.6383 0.277782C18.7781 0.243035 18.9234 0.236141 19.0658 0.257493C19.2083 0.278844 19.3451 0.328025 19.4685 0.402225C19.592 0.476425 19.6996 0.574193 19.7852 0.689945C19.8708 0.805697 19.9328 0.937168 19.9676 1.07685C20.0023 1.21653 20.0092 1.36169 19.9879 1.50404C19.9665 1.64638 19.9173 1.78313 19.843 1.90647C19.7688 2.02981 19.6709 2.13733 19.5551 2.22288L10.652 8.79262C10.4631 8.9317 10.2346 9.00654 10 9.00614Z"
                                                fill="#7AE229" />
                                            <path id="Vector_2"
                                                d="M10 14.7547C9.7654 14.7551 9.53687 14.6802 9.34802 14.5412L0.444913 7.97142C0.210967 7.79863 0.0552944 7.54005 0.0121402 7.25257C-0.031014 6.96509 0.0418855 6.67225 0.214802 6.43848C0.387718 6.20471 0.646486 6.04915 0.934181 6.00603C1.22188 5.96291 1.51493 6.03575 1.74888 6.20854L10 12.291L18.2511 6.20854C18.4851 6.03575 18.7781 5.96291 19.0658 6.00603C19.3535 6.04915 19.6123 6.20471 19.7852 6.43848C19.9581 6.67225 20.031 6.96509 19.9879 7.25257C19.9447 7.54005 19.789 7.79863 19.5551 7.97142L10.652 14.5412C10.4631 14.6802 10.2346 14.7551 10 14.7547Z"
                                                fill="#7AE229" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <span class="is-required displayNone">This field is required</span>
                </div>`;
        editTodoBox.innerHTML += getContaktFromStor();

        editTodoBox.innerHTML += /*html*/ `
    
        <div>
            <button class="editClose" onclick="closeEditModal()">
                <img src="./assets/img/close-icon.png">
            </button>
        </div>
        <div class="editSubtasks">
            <button onclick="saveTodo(${todo['id']})" id="saveAll" class="editOk">OK</button>
        </div>
    `;
    addPersonsToNewTodo();
}


async function saveTodo(id) {
    let index = id;
    let todo = todos[index]; 
    if (!todo) {
        console.error(`Todo with index ${index} not found.`);
        return;
    }

    let titleInput = document.getElementById('title');
    let text = document.getElementById('description');
    let dateInput = document.getElementById('date');
    let persons = addPersonsToNewTodo();

    todo.title = titleInput.value;
    todo.text = text.value;
    todo.date = dateInput.value;
    todo.priority = currentPriority;
    todo.members = persons;
    console.log(todo.members);
    await setItemTodo();
    showTodo(id);
    updateHTML();
    closeEditModal();
}


let addPersonsToNewTodo = () => {
    let persons = [];
    
    for (let i = 0; i < contactsForAddTask.length; i++) {
        const contact = contactsForAddTask[i];
    
        if (contact['checked?'] === 'checked') {
            let firstName = contact['first-name'];
            let lastName = contact['last-name'];
            let fullName = `${firstName} ${lastName}`;
    
            persons.push(fullName);
        }
    }
    return persons; 
}




function getContaktFromStor () {
return /*html*/`
    <div class="addTaskDropdown">
                <span class="typography2T6">Assinged to</span>
                <div style="height: 51px;" class="dropdown dropdown-assinged-to typography2T6">
                    <div class="dropdown-content">
                        <div id="select-box2" onclick="toggleDropdown('dropdown-assinged-to');renderContacts()"
                            class="dropdown-option dropdown-start-text">
                            <div class="dropdown-option dropdown-start-text">
                                <div id="select-contacts-to-assign" style="display: unset;">Select contacts to assign
                                </div>
                                <div id="select-contacts-to-assign-img"><img src="assets/img/vector2.svg"></div>
                            </div>

                            <div id="input-container2" class="dropdown-option" style="display: none;">
                                <input id="assinged-to-input" class="typography2T6 inputFrame"
                                    placeholder="Contact E-Mail" type="email">
                                <div class="check-container">
                                    <img onclick="" src="assets/img/icons/dropdown-close-button.svg">
                                    <img src="assets/img/icons/dropdown-abtrenner.svg">
                                    <img onclick="addNewCategory()" src="assets/img/icons/dropdown-check-button.svg">
                                </div>
                            </div>
                        </div>
                        <div id="contacts"></div>
                        <div id="emails"></div>

                        <div onclick="showInviteNewContactInput()" class="dropdown-option dropdown-option-img">Invite
                            new contact<div><img src="assets/img/icons/invite-new-contact.svg"></div>
                        </div>
                    </div>
                </div>
                <div id="assinged-persons-container">
                </div>
            </div>

`;
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



