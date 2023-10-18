// Arrays
let contactsForAddTask = []
let categorys = []
let subtasks = []
let emails = []
let newTask = []
    // Variables
let currentPriority = ""
let newCategoryStatus = false
let assingedToStatus = false

/**
 * pre sets the arrays whit values. This function can also be used to reset every array
 */
function initArrays() {
    categorys = [{
            'category': 'Sales',
            'color': 'pink',
        },
        {
            'category': 'Backoffice',
            'color': 'mint',
        }
    ]
    getContaktfromBackend();
    emails = [];
    subtasks = [];
}

/**
 * Loads the contacts from the backend 
 * @returns the conacts for add task array
 */
async function getContaktfromBackend() {
    let tasks = JSON.parse(await getItem('contacts'));
    tasks.forEach(task => {
        let names = task.name.split(" ");
        let contact = {
            'first-name': names[0],
            'last-name': names[1],
            'checked?': 'unchecked',
            'color': task.colorIcon,
        };
        contactsForAddTask.push(contact);
    });

    return contactsForAddTask;
}
// Functions for Category Dropdown menu

/**
 * This functions is used to open and close the dropdown menus
 * @param {string} menuClass - this is the class of the menu, givin in the HTML,  
 * that you want to open and close
 * 
 */
function toggleDropdown(menuClass) {
    const dropdownMenu = document.getElementsByClassName(menuClass)[0];
    if (newCategoryStatus || assingedToStatus === true) {

    } else {
        if (dropdownMenu.style.height === '51px') {
            dropdownMenu.style.height = '204px';
            dropdownMenu.style.overflow = 'scroll'
        } else {
            dropdownMenu.style.height = '51px';
            dropdownMenu.style.overflow = 'hidden'
        }
    }
}

/**
 * Renders the categorys to the dropdown menu
 */
function renderCategorys() {
    let categorysContainer = document.getElementById('categorys')

    categorysContainer.innerHTML = ""
    for (let i = 0; i < categorys.length; i++) {
        let categoryName = categorys[i].category;
        let categoryColor = categorys[i].color


        categorysContainer.innerHTML += ` 
    
    <div onclick="selectTaskCategory(${i})" id="s${i}" class="dropdown-option category">${categoryName} <div class="circle-${categoryColor}"></div>
    </div>`

    }

}
/**
 * This function adds an input to addNewCcategory
 * @param {string} display1 - is important for the toggleInput() function
 * it will be used to change the style: display 
 */
function newCategory(display1) {
    showNewCotegory()
    prepareInput(display1)
    toggleColorPallete('flex')
}

/**
 * shows the inputfield and execute some comfort functions
 * @param {*} display1 -is important for the toggleInput() function
 * it will be used to change the style display 
 */
function prepareInput(display1) {
    toggleInput(display1, 'input-container')
    toggleDropdown('dropdown-category')
    document.getElementById('new-category-input').focus()
    newCategoryStatus = true
}
/**
 * Toggles the choose color bar under the input
 * @param {string} action - needs none or flex to toggle the color palette
 */
function toggleColorPallete(action) {
    let colors = document.getElementById('colors-container')
    colors.style.display = `${action}`
}
/**
 * shows/closes input
 * @param {string} display1 -need flex or none to change the display style
 * @param {string} containerID -the ID of the input you want to toggle
 */
function toggleInput(display1, containerId) {
    let inputContainer = document.getElementById(`${containerId}`)
    inputContainer.style.display = `${display1}`
}
/**
 * Adds new Category to the top of the Dropdownmenu
 */
function showNewCotegory() {
    let selectBox = document.getElementById('select-box')
    clearSelectBox('select-box')
    selectBox.innerHTML = `     
  <div id="input-container" class="dropdown-option" style="display: none;">
  <input id="new-category-input" class="caption inputFrame"
      placeholder="New Category Name" type="text">
  <div class="check-container">
      <img onclick="discardNewCategory('none','unset','unset')"
          src="assets/img/icons/dropdown-close-button.svg">
      <img src="assets/img/icons/dropdown-abtrenner.svg">
      <img onclick="addNewCategory()" src="assets/img/icons/dropdown-check-button.svg">
  </div>
</div>
  `
}

/**
 * resets the dropdown menu when new category is open
 * @param {string} display1 -flex or none is needed for the toggleInput()
 */
function discardNewCategory(display1) {
    newCategoryStatus = false
    toggleInput(display1, 'input-container')
    clearSelectBox('select-box')

    toggleColorPallete('none')

}
/**
 * Puts a selected category into the select-box to show it on the top 
 * @param {Array.index} id -needs a index number of the array categorys[] 
 */
function selectTaskCategory(id) {
    let selectBox = document.getElementById('select-box')
    let selected = document.getElementById(`s${id}`)

    if (selectBox.innerHTML.includes(`id="s${id}"`)) {
        clearSelectBox('select-box')
    } else {
        toggleDropdown('dropdown-category')

        clearSelectBox('select-box')
        selectBox.innerHTML += selected.outerHTML
    }
}
/**
 * adds the new catgeory to categorys[] and avoid not choosen colors and no text
 */
function addNewCategory() {
    let input = document.getElementById('new-category-input')
    let value = input.value

    let selectedColor = getSelectedColor();
    if (selectedColor === null) {
        showWarning('Please give your category a color')
    } else if (value == "") {

        showWarning('Please give your category a name')
    } else {
        categorys.push({
            'category': `${value}`,
            'color': `${selectedColor}`,
        })
        renderCategorys()
        selectTaskCategory(categorys.length - 1)
        newCategoryStatus = false
        toggleDropdown('dropdown-category')

        toggleColorPallete('none')
    }


}
/**
 * 
 * @returns the choosen cooler on the color bar and returns null if nothing is choosen
 */
function getSelectedColor() {
    const colors = document.getElementsByName("color");
    for (let i = 0; i < colors.length; i++) {
        if (colors[i].checked) {
            return colors[i].value;
        }
    }
    return null; // Wenn keine Farbe ausgewählt ist

}

/**
 * adds select task category to the top if the select-box is empty
 */
window.addEventListener("click", function() {
    let selectBox = document.getElementById('select-box');
    if (selectBox.innerHTML == "") {
        selectBox.innerHTML = `  <div class="dropdown-option dropdown-start-text">
    <div id="select-task-category" style="display: unset;">Select task category</div>
    <div id="select-task-category-img"><img src="assets/img/vector2.svg"></div>
</div>`;
    }
})


/**
 * deletes everthing inside of the select box
 */
function clearSelectBox(selectbox) {
    let selectBox = document.getElementById(`${selectbox}`)
    selectBox.innerHTML = ""
}
//================= functions for Assinged to ========================

/**
 * checks/unchecks the checkmark
 * @param {string} id - the id of checkmark you clicking on 
 */
function checkButton(id) {

    let checkbox = document.getElementsByClassName(`check-button`)[id]
    let checkboxChecked = document.getElementsByClassName(`check-button-checked`)[id]

    if (checkbox.style.display === 'none') {
        checkbox.style.display = 'unset'
        checkboxChecked.style.display = 'none'

    } else {
        checkbox.style.display = 'none'
        checkboxChecked.style.display = 'unset'
    }
}
/**
 * set the contact on checked/uncheckd in the JSON array
 * @param {id} id - the id of person you clicking on 
 */
function checkInJSON(id) {
    let checkbox = document.getElementsByClassName(`check-button`)[id]
    if (checkbox.style.display === 'unset') {
        contactsForAddTask[id]['checked?'] = 'unchecked'
    } else {
        contactsForAddTask[id]['checked?'] = 'checked'
    }
}
/**
 * renders the contacts form the contactsForAddTask array into to the dropdown
 */
function renderContacts() {
    let contacts = document.getElementById('contacts')
    contacts.innerHTML = "";

    for (let i = 0; i < contactsForAddTask.length; i++) {
        let name = contactsForAddTask[i]["first-name"];
        let lastName = contactsForAddTask[i]["last-name"]


        contacts.innerHTML += `
    <div onclick="checkButton(${i});checkInJSON(${i});renderPersons()" class="dropdown-option dropdown-option-img" id="at${i}">
      ${name} ${lastName}
      <div>
          <img class="check-button" src="assets/img/icons/Check button v1.svg">
          <img style="display: none;" class="check-button-checked" src="assets/img/icons/Check button v1 checked.svg">
      </div>
    </div>`

    }
    renderEmails()
}
/**
 * renders the contacts under the dropdown menu to see wich persons the task is assinged to
 */
function renderPersons() {

    let persons = document.getElementById('assinged-persons-container')
    persons.innerHTML = "";

    for (let i = 0; i < contactsForAddTask.length; i++) {
        if (contactsForAddTask[i]["checked?"] === 'checked') {

            let name = contactsForAddTask[i]["first-name"];
            let lastName = contactsForAddTask[i]["last-name"];
            let color = contactsForAddTask[i]["color"];


            name = name.charAt(0)
            lastName = lastName.charAt(0)

            persons.innerHTML += `
      <div style="background-color: ${color}" class="assinged-person">
                        <Span>${name}${lastName}</Span>
                    </div>
      `;
        } else {}
    }
}
/**
 * eventlistner to fill the selcetbox if its empty with default value
 */
window.addEventListener("click", function() {
    let selectBox2 = document.getElementById('select-box2')
    if (selectBox2.innerHTML == "") {
        selectBox2.innerHTML = /*html*/ `   

    <div class="dropdown-option dropdown-start-text">
    <div id="select-contacts-to-assign" style="display: unset;">Select contacts to assign</div>
    <div id="select-contacts-to-assign-img"><img src="assets/img/vector2.svg"></div>
</div>
    `
    }
})

/**
 * shows the input on dreopdown menu
 */
function showInviteNewContactInput() {

    let selectBox2 = document.getElementById('select-box2')
    clearSelectBox('select-box2')

    selectBox2.innerHTML = /*html*/ `     
  
  <div id="input-container2" class="dropdown-option" style="display: none;">
  <input id="assinged-to-input" class="caption inputFrame"
      placeholder="Contact E-Mail" type="email">
  <div class="check-container">
      <img onclick="discardAssingedTo()"
          src="assets/img/icons/dropdown-close-button.svg">
      <img src="assets/img/icons/dropdown-abtrenner.svg">
      <img onclick="applyNewEmail()" src="assets/img/icons/dropdown-check-button.svg">
  </div>
</div>
  `;

    prepareAssingedToInput()
}

/**
 * some functions to make the input available
 */
function prepareAssingedToInput() {
    toggleInput('flex', 'input-container2')
    toggleDropdown('dropdown-assinged-to')
    assingedToStatus = true
    document.getElementById('assinged-to-input').focus()
}

/**
 * clears the first reiter of the dropdown
 */
function discardAssingedTo() {
    clearSelectBox('select-box2')
    assingedToStatus = false

}

/**
 * checks and appls the email into the emails array
 */
function applyNewEmail() {

    let input = document.getElementById('assinged-to-input')
    let vaildEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(vaildEmail)) {

        emails.push(input.value)

        renderEmails()
        discardAssingedTo()

    } else {
        showWarning('This email is invaild')
    }
}
/**
 * renders the email form the email array into the dropdown
 */
function renderEmails() {
    let emailscontainer = document.getElementById('emails')
    emailscontainer.innerHTML = '<div class="dropdown-option send-email"><b>Send Email to:</b></div>'

    if (emails.length > 0) {
        for (let i = 0; i < emails.length; i++) {
            let email = emails[i]
            index = i + contactsForAddTask.length

            emailscontainer.innerHTML += `
      
      <div onclick="checkButton(${index});" class="dropdown-option dropdown-option-img" id="${index}">
        ${email}
        <div>
            <img style="display: none;" " class="check-button" src="assets/img/icons/Check button v1.svg">
            <img style="display: unset;"  class="check-button-checked" src="assets/img/icons/Check button v1 checked.svg">
        </div>
      </div>`
        }
    }
}
// ===================================Dropdowns Ende============================