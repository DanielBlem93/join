let contacts = [];
let contact = [];
let contactsArray = [];
let currentContact = null;

function openModalAddContakt() {
    resetModal();
    document.getElementById('add-contakt-modal').style.right = '0';
}
function closeModal(){
    document.getElementById('add-contakt-modal').style.right = '-200%';
}

/**
 * Creates a new contact and stores it in LocalStorage.
 * Fetches values from the input fields 'contactName', 'contactEmail', and 'contactPhone'.
 * Stores the contact in an array stored in LocalStorage under the key 'contacts'.
 * Refreshes the contact list and closes the modal.
 * Refreshes the page to reflect the changes.
 * @async
 */
async function createContact(){
    let id = Math.random().toString(36).substr(2) + Date.now().toString(36);
    

    const contact = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        id: id
    }

    let contacts = JSON.parse(await getItem('contacts')) || [];
    contacts.push(contact);
    await setItem('contacts', JSON.stringify(contacts));
    getContacts();
    closeModal();
    window.location.reload();
}
/**
 * Sets the value of an HTML element.
 * @param {string} id - The ID of the HTML element.
 * @param {string} value - The new value to be set.
 */
function setValue(id, value) {
    document.getElementById(id).value = value;
}

/**
 * Toggles a class for an HTML element.
 * @param {string} id - The ID of the HTML element.
 * @param {string} className - The class to be toggled.
 * @param {boolean} shouldAdd - If true, adds the class, otherwise removes it.
 */
function toggleClass(id, className, shouldAdd) {
    const element = document.getElementById(id);
    shouldAdd ? element.classList.add(className) : element.classList.remove(className);
}

/**
 * Resets the modal by clearing input fields and toggling visibility of buttons.
 * Changes the header text to default values.
 */
function resetModal() {
    setValue('contactName', '');
    setValue('contactEmail', '');
    setValue('contactPhone', '');

    toggleClass('btn-add', 'displaynone', false);
    toggleClass('btn-edit', 'displaynone', true);

    setValue('header-add-edit', 'Add');
    setValue('header-text', 'Tasks are better with a team!');
}


/**
 * Renders an action button for a contact.
 * @param {string} contactString - The stringified contact object.
 * @param {string} action - The action for the button.
 * @return {string} The HTML string for the action button.
 */
function renderActionButton(contactString, action) {
    let imgPath = action === 'edit' ? './assets/img/edit.png' : './assets/img/delete.png';
    let actionFunction = action === 'edit' ? 'openModalEditContakt' : 'deleteContact';

    return /*html*/ `
        <div onclick="${actionFunction}(${contactString})" class="contact-body-header-${action}">
            <img src="${imgPath}" alt="">
            ${action.charAt(0).toUpperCase() + action.slice(1)}
        </div>
    `;
}

/**
 * Renders a contact.
 * @param {Object} contact - The contact to render.
 * @param {string} initials - The initials of the contact name.
 * @return {string} The HTML string for the contact.
 */
function renderContact(contact, initials, color = getRandomColor()) {
    let contactString = JSON.stringify(contact).replace(/"/g, '&quot;');
    return /*html*/`
         <div class="contact-header">
            <div class="contact-header-icon" style="background-color: ${color};">${initials}</div>
            <div>
                <div class="contact-header-name">${contact.name}</div>
                <div class="contact-header-add-task">
                    ${renderActionButton(contactString, 'edit')}
                    ${renderActionButton(contactString, 'delete')}
                </div>
            </div>
        </div>
        <div class="contact-body">
            <div class="contact-body-header">
                <div class="contact-body-header-title">Contact Information</div>
            </div>
            <div class="contact-body-item">
                <div class="contact-body-item-title">Email</div>
                <div class="contact-body-item-value-email">${contact.email}</div>
            </div>
            <div class="contact-body-item">
                <div class="contact-body-item-title">Phone</div>
                <div class="contact-body-item-value">${contact.phone}</div>
            </div>
        </div>
    `;
}


/**
 * Shows the selected contact in a right panel.
 * @param {number} index - The index of the contact in the contacts array.
 */
function showContact(index){
    const contact = contactsArray[index];
    const contactContent = document.getElementById('contact-content');
    contactContent.style.right = '0';
    const initials = getInitials(contact.name);
    const initial = initials.join('');
    
    contactContent.innerHTML = renderContact(contact, initial);
}



/**
 * Deletes a contact from the contacts list in LocalStorage and refreshes the contacts list and the page.
 * @param {Object} contact - The contact to be deleted.
 * @async
 */
async function deleteContact(contact) {
    let contacts = JSON.parse(await getItem('contacts')) || [];
    contacts = contacts.filter(item => item.name !== contact.name);
    await setItem('contacts', JSON.stringify(contacts));
    getContacts();
    window.location.reload();
}

/**
 * Generates a random RGB color.
 * @return {string} The random RGB color.
 */
function getRandomColor() {
    const colorValues = Array.from({length: 3}, () => Math.floor(Math.random() * 256));
    return `rgb(${colorValues.join(', ')})`;
}



/**
 * Generates the HTML for a contact block.
 * @param {Object} contact - The contact object.
 * @param {string} firstInitial - The first initial of the contact's name.
 * @param {string} secondInitial - The second initial of the contact's name.
 * @param {string} color - The color for the contact icon.
 * @param {number} contactIndex - The index of the contact in the contacts array.
 * @return {string} The HTML string for the contact block.
 */
function renderContactBlock(contact, firstInitial, secondInitial, color, contactIndex) {
    return /*html*/`
        <div onclick="showContact(${contactIndex})" class="contacts-list-item">
            <div class="contact-list-icon" style="background-color: ${color};">
                ${firstInitial.toUpperCase()}${secondInitial.toUpperCase()}    
            </div>
            <div>
                <div class="contacts-list-item-name">${contact.name}</div>
                <div class="contacts-list-item-email">${contact.email}</div>
            </div>
        </div>`;
}

/**
 * Fetches contacts from Storage, sorts them, generates the corresponding HTML and inserts it into the contact list.
 * @async
 */
async function getContacts() {
    const contactList = document.getElementById('contacts-list');
    let contacts = JSON.parse(await getItem('contacts')) || [];
    contacts = contacts.filter(contact => contact.name);
    contacts.sort((a, b) => a.name.localeCompare(b.name, undefined, {sensitivity: 'base'}))

    let lastInitial = '';
    let htmlString = contacts.reduce((acc, contact) => {
        const [firstInitial, secondInitial] = getInitials(contact.name);
        const color = getRandomColor();
        const initialBlock = firstInitial.toUpperCase() !== lastInitial 
            ? `<div class="contact-list-first-latter">${firstInitial.toUpperCase()}</div><hr class="contact-list-hr">` 
            : '';

        lastInitial = firstInitial.toUpperCase();
        contactsArray.push(contact); 
        const contactIndex = contactsArray.length - 1;
        const contactBlock = renderContactBlock(contact, firstInitial, secondInitial, color, contactIndex);

        return acc + initialBlock + contactBlock;
    }, '');

    contactList.innerHTML = htmlString;
}


/**
 * Gets the initials of a name.
 * @param {string} name - The name.
 * @return {Array} An array with the first and second initial.
 */
function getInitials(name) {
    const [firstWord = '', secondWord = ''] = name.split(' ');
    return [firstWord[0] || '', secondWord[0] || ''];
}


    
 




