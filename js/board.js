let todos = [];
let currentToDos = [];
let currentDraggedElement;


/**
 * Asynchronous function that retrieves tasks from storage, processes them, and adds them to the todos list.
 * Each task comprises the following properties: id, category, task category, title, text, done fraction, members, priority, selected color, date, and task ID.
 * After the tasks are added, the HTML is updated to reflect the new tasks.
 * 
 * @async
 * @function
 * @returns {Promise<void>} No return value
 * @throws {Error} Throws an error if loading tasks or converting the resulting string to JSON fails.
 */
async function addTask() {
    let addTasks = JSON.parse(await getItem('task'));
    for (let taskArray of addTasks) {
        for (let task of taskArray) {
            let existingTask = todos.find(t => t.taskID === task.taskID);
            if (!existingTask) {
                todos.push({
                    'id': todos.length,
                    'category': 'open',
                    'task-category': task.category,
                    'title': task.title,
                    'text': task.description,
                    'done-fraction': '',
                    'members': task.persons && task.persons[0] && task.persons[0].name ? task.persons[0].name : 'All Employees',
                    'priority': task.priority,
                    'selected-color': '',
                    'date': task.date,
                    'taskID': task.taskID
                })
            }
        }
    }
    updateHTML();
}


/**
 * Asynchronous function that retrieves stored todos from the storage.
 * If stored todos exist, it parses the JSON string to an object and assigns it to the 'todos' array.
 *
 * @async
 * @function
 * @returns {Promise<void>} No return value.
 * @throws {Error} Throws an error if loading todos or parsing the resulting string fails.
 */
async function getStoredTodos() {
    const storedTodos = await getItem('todos');
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
    }
}


/**
 * This function is used to initiate the HTML page.  
 * It will include the template for the header and navigation. 
 * In addition, the toDo divs are generated.
 */
async function initBoard() {
    await getStoredTodos();
    await addTask();
    init();
    updateHTML();
}
  

/**
 * This function contains the subfunctions for rendering the four subboards: open, progress, feedback and closed.
 * In addition, the full name and the name abbreviation are generated by the corresponding function call.
 * Finally, the function for styling the todo divs is called.
 */
async function updateHTML() {
    renderToDos('open');
    renderToDos('progress');
    renderToDos('feedback');
    renderToDos('closed');
    styleTodos();
    await setItemTodo();
}


/**
 * Asynchronous function that stores the current state of 'todos' into storage.
 * It serializes the 'todos' array to a JSON string before storing.
 *
 * @async
 * @function
 * @returns {Promise<void>} No return value.
 * @throws {Error} Throws an error if setting the item in storage fails.
 */
async function setItemTodo() {
    //Clear task storage dont delete!!!
    // todos = [];
    // await setItem('task', JSON.stringify(todos));
    await setItem('todos', JSON.stringify(todos));
}


/**
 * This function is used to filter todos by category with subsequent generation of todo div elements.
 * 
 * @param {string} category - This parameter stands for the category of a todo and at the same time for the name of the subboard to which it belongs.
 */
function renderToDos(category) {
    
    let filteredToDos = todos.filter(t => t['category'] == category);

    document.getElementById(category).innerHTML = '';

    for (let i = 0; i < filteredToDos.length; i++) {
        const element = filteredToDos[i];
        document.getElementById(category).innerHTML += generateToDoHTML(element);
        generateToDoHTML(i);
    }  
}


/**
 * This function is used to store the currently "dragged" todo div ID in a global variable.
 * 
 * @param {number} id - This is the number of the currently dragged todo div (= ID)
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * This function allows the drop functionality. It is a standard of the w3 consortium.
 * 
 * @param {} ev - This parameter is mandatory for the w3 consortium drop function.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * This is the "drop functionality". The current todo div is assigned the corresponding new category of the subboard.
 * Subsequently, the todo divs are regenerated; that is, updated.
 * 
 * @param {string} category - This parameter is the name of the new category
 */
async function movedTo(category) {
    todos[currentDraggedElement]['category'] = category;
    updateHTML();
    await setItemTodo();
}


/**
 * This function adds style elements to the todo divs.
 */
function styleTodos() {
    for (let i = 0; i < todos.length; i++) {
        const selectedColor = todos[i]['selected-color'];
        document.getElementById(`todoBoxHeader${todos[i]['id']}`).classList.add(`bg-cat-color-${selectedColor}`);
    }
}


/**
 * Generates an HTML string for a todo box element with various details about a task.
 *
 * This function expects an `element` object that includes the following properties:
 * - id: A unique identifier for the todo task.
 * - members: A string representing the task's assigned member.
 * - priority: A string representing the task's priority level.
 * - task-category: A string representing the task's category.
 * - title: A string representing the task's title.
 * - text: A string representing the task's description.
 * - done-fraction: A string representing the percentage of the task that has been completed.
 *
 * It uses the `getFirstTwoLetters` and `generatePrioIcon` functions to process the `members` and `priority` data.
 *
 * @param {Object} element - The todo task object to be processed.
 * @returns {string} An HTML string for a todo box element.
 */
function generateToDoHTML(element) {
    let member = element['members'];
    let letters = getFirstTwoLetters(member);
    let prioImg = generatePrioIcon(element['priority']);

    return /*html*/ `
    <div onclick="showTodo(${element['id']})" class="todo-box" draggable="true" ondragstart="startDragging(${element['id']})">
    <div id="todoBoxHeader${element['id']}" class="todo-box-header">
        <h4>${element['task-category']}</h4>
    </div>

    <div class="todo-box-title">
        <h3>${element['title']}</h3>
    </div>

    <div class="todo-box-body">
        <p>${element['text']}</p>
    </div>

    <div class="todo-box-progress">
        <div class="todo-box-progress-bar">
            <div class="todo-box-progress-bar-fill"></div>
        </div>
        <p>${element['done-fraction']} Done</p>
    </div>
    <div id="todoBoxFooterBar${element['id']}" class="todo-box-footer-bar">
    <div  class="todo-box-footer">
        <div class="todo-box-footer-right">
            ${letters}
        </div>
         <div class="todo-box-footer-left">
             ${prioImg}
        </div>
     </div> 
    </div>
    </div>
    `;
}


/**
 * Extracts the first two letters from a given string and converts them to uppercase.
 *
 * @param {string} member - The string from which to extract the first two letters.
 * @returns {string} The first two letters of the input string in uppercase, or undefined if input is not a string.
 */
function getFirstTwoLetters(member) {
    if (member !== undefined && typeof member === 'string') {
        return member.slice(0, 2).toUpperCase();
    }
}


/**
 * Generates an HTML string for an image element that refers to a priority icon.
 *
 * @param {string} prio - The name of the priority level, which corresponds to the filename of the icon.
 * @returns {string} An HTML string for an image element.
 */
function generatePrioIcon(prio) {
    return /*html*/ `
    <img src="./assets/img/icons/${prio}.png" alt="${prio}">
    `;
}


/**
 * Filters the global `todos` array based on a search string and updates the HTML of the corresponding category
 * for each matched todo item.
 */
function searchTodos() {
    let searchString = document.getElementById('searchInput').value.toLowerCase();
    let searchedTodos = todos.filter(todo => 
        todo.title.toLowerCase().includes(searchString) || 
        todo.text.toLowerCase().includes(searchString));
    ['open', 'progress', 'feedback', 'closed'].forEach(category => 
        document.getElementById(category).innerHTML = ''
    );
    for (let todo of searchedTodos) {
        document.getElementById(todo.category).innerHTML += generateToDoHTML(todo);
    }
}
