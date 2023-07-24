// Arrays
let categorys = [
  {
    'category': 'Sales',
    'color': 'pink',

  },
  {
    'category': 'Backoffice',
    'color': 'mint',

  }
]
// Variables
let newCategoryStatus = false


// Functions for Category Dropdown menu

/**
 * This functions is used to open and close the dropdown menus
 * @param {string} menuClass - this is the class of the menu, givin in the HTML,  
 * that you want to open and close
 * 
 */
function toggleDropdown(menuClass) {
  const dropdownMenu = document.getElementsByClassName(menuClass)[0];
  if (newCategoryStatus === true) {
    console.log('Aufklappen geblockt')
  } else {
    if (dropdownMenu.style.height === '51px') {
      dropdownMenu.style.height = 'fit-content';
    } else {
      dropdownMenu.style.height = '51px';
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
 * This function adds an input to add a new category
 * @param {string} display1 - is important for the toggleInputCategory() function
 * it will be used to change the style: display 
 */
function newCategory(display1) {
  showNewCotegory()
  prepareInput(display1)
  toggleColorPallete('flex')
}

/**
 * shows the inputfield and execute some comfort functions
 * @param {*} display1 -is important for the toggleInputCategory() function
 * it will be used to change the style display 
 */
function prepareInput(display1) {
  toggleInputCategory(display1)
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
 * toggles the input
 * @param {string} display1 - need flex or none to change the display style
 */
function toggleInputCategory(display1) {
  let inputContainer = document.getElementById('input-container')
  inputContainer.style.display = `${display1}`
}
/**
 * Adds new Category to the top of the Dropdownmenu
 */
function showNewCotegory() {
  let selectBox = document.getElementById('select-box')
  clearSelectBox()
  selectBox.innerHTML = `     
  <div id="input-container" class="dropdown-option" style="display: none;">
  <input id="new-category-input" class="typography2T6 inputFrame"
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
 * @param {string} display1 -flex or none is needed for the toggleInputCategory()
 */
function discardNewCategory(display1) {
  newCategoryStatus = false
  toggleInputCategory(display1)
  clearSelectBox()
  toggleDropdown('dropdown-category')
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
    clearSelectBox()
  } else {
    toggleDropdown('dropdown-category')

    clearSelectBox()
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
    alert('choose a color')
  } else if (value == "") {tog
    alert('Give your category a name')
  }
  else {
    categorys.push(
      {
        'category': `${value}`,
        'color': `${selectedColor}`,
      }
    )
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
window.addEventListener("click", function () {
  let selectBox = document.getElementById('select-box')
  if (selectBox.innerHTML == "") {
    selectBox.innerHTML = `  <div id="start-text" class="dropdown-option dropdown-start-text">
    <div id="select-task-category" style="display: unset;">Select task category</div>
    <div id="select-task-category-img"><img src="assets/img/vector2.svg"></div>
</div>`
  }
})
/**
 * deletes everthing inside of the select box
 */
function clearSelectBox() {
  let selectBox = document.getElementById('select-box')
  selectBox.innerHTML = ""
}


// Variables for Assinged to
let contactsForAddTask = [

  {
    'first-name': 'Maximilian',
    'last-name': 'Vogel',
    'checked?': 'unchecked',
    'color': 'var(--mint)'
  }
]
let atChecked = false

// functions for Assinged to



/**
 * 
 * @param {*} id 
 */
function checkButton(id) {

  let checkbox = document.getElementsByClassName(`check-button`)[id]
  let checkboxChecked = document.getElementsByClassName(`check-button-checked`)[id]

  if (atChecked) {
    checkbox.style.display = 'unset'
    checkboxChecked.style.display = 'none'
    contactsForAddTask[id]['checked?'] = 'unchecked'
  } else {
    checkbox.style.display = 'none'
    checkboxChecked.style.display = 'unset'
    contactsForAddTask[id]['checked?'] = 'checked'
  }
  atChecked = !atChecked

}

function renderContacts() {
  let contacts = document.getElementById('contacts')
  contacts.innerHTML = "";

  for (let i = 0; i < contactsForAddTask.length; i++) {
    let name = contactsForAddTask[i]["first-name"];
    let lastName = contactsForAddTask[i]["last-name"]


    contacts.innerHTML += `
    <div onclick="checkButton(${i});renderPersons()" class="dropdown-option dropdown-option-img" id="at${i}">
    ${name} ${lastName}
    <div>
        <img class="check-button" src="assets/img/icons/Check button v1.svg">
        <img class="check-button-checked" src="assets/img/icons/Check button v1 checked.svg">
    </div>
</div>`
  }
}


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

      persons.innerHTML = `
      <div style="background-color: ${color}" class="assinged-person">
                        <Span>${name}${lastName}</Span>
                    </div>
      `;
    } else {


    }

  }

}