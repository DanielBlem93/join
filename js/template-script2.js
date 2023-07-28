async function init() {
    await includeHTML();
    await getUserName();
    await allUserName();
    await setInitials();
    if(window.location.pathname == '/join/contacts.html'){
    await getContacts();
    }
}

async function allUserName(){
    let allUsers = JSON.parse(await getItem('userName'));
    let currentUserName = await getItem('currentUserName');
    // console.log(allUsers);
    // console.log(currentUserName);
}

function showLogout() {
    let logout = document.getElementById('logout');
    logout.classList.toggle('hidden-logout-btn');
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }

}


async function setInitials() {
    let initials = document.getElementById('temp-initials');
    let userName = await getItem('currentUserName');
    let nameArray = userName.split(' ');

   //console.log(userName)
    let firstInitial = nameArray[0].charAt(0);
    if(nameArray.length === 1) return [firstInitial, ' '];
    let secondInitial = nameArray[1].charAt(0);
    initials.innerHTML = firstInitial + secondInitial;
}


