let contacts = [];
let contact = [];

function openModalAddContakt() {
    document.getElementById('add-contakt-modal').style.right = '0';
}
function closeModal(){
    document.getElementById('add-contakt-modal').style.right = '-200%';
}

async function createContact(){
    let contactName = document.getElementById('contactName');
    let contactEmail = document.getElementById('contactEmail');
    let contactPhone = document.getElementById('contactPhone');
    contact = {
        name: contactName.value,
        email: contactEmail.value,
        phone: contactPhone.value
    }
    contacts = JSON.parse(await getItem('contacts'));
    if(contacts == null){
        contacts = [];
    }

    contacts.push(contact);
    await setItem('contacts', JSON.stringify(contacts));
    getContacts();
    closeModal();
    window.location.reload();
}

function showContact(index){
    contact = contactsArray[index];
    let contactContent = document.getElementById('contact-content');
    contactContent.style.right = '0';

    let initials = getInitials(contact.name);
    
    contactContent.innerHTML = /*html*/`
         <div class="contact-header">
            <div class="contact-header-icon">${initials[0]}${initials[1]}</div>
            <div>
                <div class="contact-header-name">${contact.name}</div>
                <div class="contact-header-add-task">+ Add Task</div>
            </div>
        </div>
        <div class="contact-body">
            <div class="contact-body-header">
                <div class="contact-body-header-title">Contact Information</div>

                <div class="contact-body-header-edit">
                    <img src="./assets/img/stift-dunkel.png" alt="">
                    Edit Contact
                </div>

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

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


let contactsArray = []; // Dieses Array wird verwendet, um auf die Kontakte zuzugreifen

async function getContacts() {
    let contactList = document.getElementById('contacts-list');
    let contacts = JSON.parse(await getItem('contacts')) || [];
    
    contacts.sort((a, b) => a.name.localeCompare(b.name, undefined, {sensitivity: 'base'}));

    let lastInitial = '';
    let htmlString = contacts.reduce((acc, contact) => {
        let [firstInitial, secondInitial] = getInitials(contact.name);
        let color = getRandomColor();
        
        let initialBlock = firstInitial.toUpperCase() !== lastInitial 
            ? `<div class="contact-list-first-latter">${firstInitial.toUpperCase()}</div><hr class="contact-list-hr">` 
            : '';

        lastInitial = firstInitial.toUpperCase();
        contactsArray.push(contact); // Füge den Kontakt zum Array hinzu

        let contactIndex = contactsArray.length - 1; // Die Indexnummer des aktuellen Kontakts
        
        let contactBlock = /*html*/`
        <div onclick="showContact(${contactIndex})" class="contacts-list-item">
            <div class="contact-list-icon" style="background-color: ${color};">
                ${firstInitial.toUpperCase()}${secondInitial.toUpperCase()}    
            </div>
            <div>
                <div class="contacts-list-item-name">${contact.name}</div>
                <div class="contacts-list-item-email">${contact.email}</div>
            </div>
        </div>`;

        return acc + initialBlock + contactBlock;
    }, '');

    contactList.innerHTML = htmlString;
}

function getInitials(name) {
    let nameArray = name.split(' ');
    let firstInitial = nameArray[0].charAt(0);
    let secondInitial = nameArray[1].charAt(0);

    return [firstInitial, secondInitial];
}



