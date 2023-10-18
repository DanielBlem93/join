
/**
 * Changes the background color of the Priority you cklicked on
 * @param {string} id - the id of the prioritybutton 
 * @param {string} priority - the priority you decided on
 */

function changeColor(id, priority) {

    let buttons = document.getElementsByClassName('input-containerPrio');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const svgPath = button.querySelector('svg');
        const isCurrentButton = button.id === id;

        if (isCurrentButton) {
            svgPath.classList.add('white-color');
            button.querySelector('span').classList.add('txtWhite');
            button.classList.add(priority);
            currentPriority = priority
        } else {
            svgPath.classList.remove('white-color');
            button.querySelector('span').classList.remove('txtWhite');
            button.classList.remove('urgent', 'medium', 'low');
        }
    }
}

/**
 * pushes the text into the subtasks array and creates a new subtask
 */

function addNewSubtask() {
    const inputElement = document.getElementById('newSubtaskInput');
    const inputValue = inputElement.value.trim();
    if (inputValue !== '') {

        subtasks.push(inputValue)
        renderSubtask()
        inputElement.value = ""

    } else {
        showWarning('Please give your Subtask a title')
    }
}

/**
 * renders the subtasks from the subtasks array
 */

function renderSubtask() {

    let container = document.getElementById('subtaskContainer')
    container.innerHTML = ""

    for (let i = 0; i < subtasks.length; i++) {
        const task = subtasks[i];

        container.innerHTML +=
            `
    <label>
      <input type="checkbox" checked="checked">
      <span class="checkmarkText typography2body subtask">${task}</span>
      <span class="checkmark"><img class="rectangle6" src="./assets/img/rectangle6.svg"></span>
    </label
    `
    }

}

/**
 * clears the complete tasks 
 */
function clearTask() {
    let title = document.getElementById('title')
    let description = document.getElementById('description')
    let date = document.getElementById('date')

    title.value = ""
    description.value = ""
    date.value = ""
    resetPriority()
    initArrays()
    renderPersons()
    renderSubtask()
    clearSelectBox('select-box')
    clearSelectBox('select-box2')
    newCategoryStatus = false
    assingedToStatus = false
}

/**
 * changes colors of prioritys back to default
 */
function resetPriority() {
    let buttons = document.getElementsByClassName('addTaskFrame14Prio');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const svgPath = button.querySelector('svg');

        button.classList.remove('urgent', 'medium', 'low');
        svgPath.classList.remove('white-color');
        button.querySelector('span').classList.remove('txtWhite');
    }
}


/**
 * creates the task
 */
async function createTask() {
    let titleInput = document.getElementById('title');
    let descriptionInput = document.getElementById('description');
    let dateInput = document.getElementById('date');
    let categoryInput = document.querySelector('#select-box > div');
    let persons = await addPersonsToNewTask();
    let title = titleInput.value.trim();
    let description = descriptionInput.value.trim();
    let date = dateInput.value.trim();
    let category = categoryInput.innerText.trim();
    let taskId = Math.random().toString(36).substr(2) + Date.now().toString(36);

    let color;
    for (let cat of categorys) {
        if (cat.category === category) {
            color = cat.color;
            break;
        }
    }

    if (checkRequierdInputs()) {
        // Erstelle zunächst das neue Aufgabenobjekt
        newTask = [{
            'status': selectedCategory || 'open',
            'title': title,
            'description': description,
            'date': date,
            'category': category,
            'persons': persons,
            'emails': [emails],
            'priority': currentPriority,
            'subtasks': subtasks,
            'taskID': taskId,
            'color': color
        }];

        clearTask();
        createTaskBackend(newTask);
        animations();
    }
}
/**
 * pushes the seleced persons with color to the persons array 
 * @returns returns the persons array
 */
async function addPersonsToNewTask() {
    let persons = [];

    for (let i = 0; i < contactsForAddTask.length; i++) {
        const contact = contactsForAddTask[i];

        if (contact['checked?'] === 'checked') {
            let firstName = contact['first-name'];
            let lastName = contact['last-name'];
            let color = contact['color'];
            let name = { 'name': `${firstName} ${lastName} ${color}` };

            persons.push(name);
        }
    }

    return persons;
}

// =============== Checking inputs ===================================
/**
 * Checks every input. 
 * @returns true if all inputs aren't empty false if minimum one is empty
 */
function checkRequierdInputs() {
    let checkInputTitle = checkInput('title');
    let checkInputDescription = checkInput('description');
    let checkInputDate = checkInput('date');
    let checkCategorys = checkCategory();
    let checkPrios = checkPrio();

    if (checkInputTitle && checkInputDescription && checkInputDate && checkCategorys && checkPrios) {
        return true;
    } else {
        showWarning('Please fill out all required fields')
        return false;
    }
}
/**
 * shows a message that this field is requierd if no category is selected
 * @returns 
 */
function checkCategory() {
    let categoryInput = document.querySelector('#select-box > div');
    let category = categoryInput.innerText.trim();

    if (category === 'Select task category') {
        showIsRequiered(2, 'remove');
        return false;
    } else {
        if (newCategoryStatus === true) {
            showIsRequiered(2, 'remove');
            return false;
        } else {
            showIsRequiered(2, 'add');
            return true;
        }
    }
}
/**
 * checks if the input is empty and shows a message if it is
 * @param {string} inputs - the id of the input 
 * @returns -true if the input is filled and false if not
 */
function checkInput(inputs) {
    let input = document.getElementById(inputs);
    let inputValue = input.value.trim();
    let index = getRequiredIndex(inputs);

    if (inputValue.length > 0) {
        showIsRequiered(index, 'add');
        return true;
    } else {
        showIsRequiered(index, 'remove');
        return false;
    }
}
/**
 * Is important to show the right "This filed is required" text
 * @param {string} inputs -the id of the input
 * @returns -the index for the right "This filed is required" text position
 */
function getRequiredIndex(inputs) {
    const inputMappings = {
        'title': 0,
        'description': 1,
        'date': 3
    };

    return inputMappings[inputs] || 0; // Fallback to 0 if inputs is not found in the object
}


/**
 * checks if a priority is selected
 * @returns - true if its selected and false if not
 */
function checkPrio() {
    if (currentPriority.length > 0) {
        showIsRequiered(4, 'add');
        return true;
    } else {
        showIsRequiered(4, 'remove');
        return false;
    }
}
/**
 * 
 * @param {string} index - the index for the right "This filed is required" text position 
 * @param {string} action - 'add' or 'remove' for the classlist
 */
function showIsRequiered(index, action) {
    let required = document.getElementsByClassName('is-required')[index];
    required.classList[action]('displayNone');
}
/**
 * Shows a Messagebox 
 * @param {string} text -the text you want to show in the Messagebox
 */
function showWarning(text) {
    let massageBox = document.getElementById('created-task-massage-text')
    let img = document.querySelector('#created-task-massage > img')
    img.style.display = 'none'

    flyIn('flex')
    massageBox.innerText = `${text}`

    setTimeout(() => {
        flyIn('none')
    }, 3000);
    setTimeout(() => {
        massageBox.innerText = `Task added to board`
    }, 3100);

}

// =========================Animations ===========================
/**
 * A animation order when you press on add task
 */
function animations() {
    flyIn('flex')
    setTimeout(() => {
        flyOutBody()
        setTimeout(() => {
            swapToBoard()
        }, 250);
    }, 1000);

}
/**
 * 
 * @param {string} display - 'none ' or 'unset' to fly the messagebox in
 */
function flyIn(display) {
    let massage = document.getElementById('created-task-massage-container')

    massage.style.display = `${display}`
    setTimeout(() => {
        massage.classList.toggle('flyIn')
    }, 10);

}
/**
 * swipes the body to the right
 */
function flyOutBody() {
    let body = document.getElementsByTagName('body')[0]
    body.style.transform = ('translateX(100%)')
}
/**
 * Getting redirected to the board.html
 */
function swapToBoard() {
    window.location.href = 'board.html'
}


// =========================Date ==================================
/**
 * sets the min Date to the current Date that you cant add task in the past
 */
document.addEventListener('DOMContentLoaded', function() {
    let heute = new Date();
    let formattedDate = formatDate(heute);

    let datumInput = document.getElementById('date');
    datumInput.value = formattedDate;
    datumInput.min = formattedDate;
});
/**
 * formats the getted Date to the righ format
 * @param {date} date nneds a date created with new Date()
 * @returns the formated date
 */
function formatDate(date) {
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();

    return year + '-' + month + '-' + day;
}