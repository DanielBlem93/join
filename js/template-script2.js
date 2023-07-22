

async function init() {
    await includeHTML();
    await getUserName();
    await setInitials();
    if(window.location.pathname == '/join/contacts.html'){
    await getContacts();
    }
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


