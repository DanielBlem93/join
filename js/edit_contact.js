/** 
 * Sets the right CSS property of an element with a given id
 * @param {string} id - id of the HTML element 
 * @param {string} value - The new right CSS property value
 */
function setElementRightProperty(id, value) {
    document.getElementById(id).style.right = value;
}

/** 
 * Updates the innerHTML property of an element with a given id
 * @param {string} id - id of the HTML element 
 * @param {string} value - The new innerHTML property value
 */
function updateElementHTML(id, value) {
    document.getElementById(id).innerHTML = value;
}

/** 
 * Toggles the visibility of a button
 * @param {string} id - id of the HTML element 
 */
function toggleButtonVisibility(id) {
    let button = document.getElementById(id);
    button.classList.toggle('displaynone');
}

/**
 * Updates the contact form fields with the contact details
 * @param {Object} contact - The contact object
 */
function updateContactFormFields(contact) {
    document.getElementById('contactName').value = contact.name;
    document.getElementById('contactEmail').value = contact.email;
    document.getElementById('contactPhone').value = contact.phone;
}

/** 
 * Opens the modal to edit a contact.
 * @param {Object} contact - The contact object to edit.
 */
function openModalEditContakt(contact){
    currentContact = contact;
    console.log(currentContact);

    setElementRightProperty('add-contakt-modal', '0');
    updateContactFormFields(currentContact);

    toggleButtonVisibility('btn-add');
    toggleButtonVisibility('btn-edit');

    updateElementHTML('header-add-edit', 'Edit');
    updateElementHTML('header-text', '');
}

/** 
 * Updates the current contact object with the data from the form fields
 */
function updateCurrentContact() {
    let contactName = document.getElementById('contactName');
    let contactEmail = document.getElementById('contactEmail');
    let contactPhone = document.getElementById('contactPhone');

    currentContact.name = contactName.value; 
    currentContact.email = contactEmail.value; 
    currentContact.phone = contactPhone.value; 
}

/** 
 * Saves the edited contact.
 * @async
 */
async function saveContact(){
    updateCurrentContact();

    if (!validateContact(currentContact)) {
        return;
    }

    let contacts = JSON.parse(await getItem('contacts'));
    let index = contacts.findIndex(item => item.id === currentContact.id);
    if (index !== -1) {
        contacts[index] = currentContact;
    }

    
    await setItem('contacts', JSON.stringify(contacts));

    getContacts();
    closeModal();
    currentContact = null; 
    window.location.reload();
}

function isValidName(name) {
    // Nur Buchstaben und Leerzeichen erlauben
    const regex = /^[a-z]+\s[a-z]+$/i;
    return regex.test(name);
}

function isValidEmail(email) {
    // Einfache E-Mail-Validierung
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function isValidPhone(phone) {
    // Nur Zahlen erlauben, Sie können dies an die gewünschte Länge anpassen
    const regex = /^\d+$/;
    return regex.test(phone);
}

function validateContact(contact) {
    let isValid = true;
    
    // Name validieren
    if (!isValidName(contact.name)) {
        document.getElementById('contactNameError').innerText = 'Ungültiger Name.';
        document.getElementById('contactNameError').style.display = 'block';
        document.getElementById('contactNameError').style.color = 'red';
        isValid = false;
    } else {
        document.getElementById('contactNameError').style.display = 'none';
    }
    
    // E-Mail validieren
    if (!isValidEmail(contact.email)) {
        document.getElementById('contactEmailError').innerText = 'Ungültige E-Mail-Adresse.';
        document.getElementById('contactEmailError').style.display = 'block';
        document.getElementById('contactEmailError').style.color = 'red';
        isValid = false;
    } else {
        document.getElementById('contactEmailError').style.display = 'none';
    }

    // Telefonnummer validieren
    if (!isValidPhone(contact.phone)) {
        document.getElementById('contactPhoneError').innerText = 'Ungültige Telefonnummer.';
        document.getElementById('contactPhoneError').style.display = 'block';
        document.getElementById('contactPhoneError').style.color = 'red';
        isValid = false;
    } else {
        document.getElementById('contactPhoneError').style.display = 'none';
    }
    
    return isValid;
}

