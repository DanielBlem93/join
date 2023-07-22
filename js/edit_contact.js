function openModalEditContakt(contact){
    document.getElementById('add-contakt-modal').style.right = '0';
    document.getElementById('contactName').value = contact.name;
    document.getElementById('contactEmail').value = contact.email;
    document.getElementById('contactPhone').value = contact.phone;

    let btnAdd = document.getElementById('btn-add');
    btnAdd.classList.toggle('displaynone');

    let btnEdit = document.getElementById('btn-edit');
    btnEdit.classList.toggle('displaynone');

    let headerAddEdit = document.getElementById('header-add-edit');
    headerAddEdit.innerHTML = 'Edit';
    let headerText = document.getElementById('header-text');
    headerText.innerHTML = '';
    
}

async function saveContact(contact){
    let contactName = document.getElementById('contactName');
    let contactEmail = document.getElementById('contactEmail');
    let contactPhone = document.getElementById('contactPhone');

    contact.name = contactName.value;
    contact.email = contactEmail.value;
    contact.phone = contactPhone.value;

    let contacts = JSON.parse(await getItem('contacts'));

    let index = contacts.findIndex(item => item.id === contact.id);
    if (index !== -1) {
        contacts.splice(index, 1); // Delete the old contact
        contacts.push(contact); // Add the new contact to the end of the list
    }

    await setItem('contacts', JSON.stringify(contacts));

    getContacts();
    closeModal();
    window.location.reload();
}