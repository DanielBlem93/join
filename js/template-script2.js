async function init() {
    await includeHTML();
    await getUserName();
    await allUserName();
    await setInitials();
    await allUsers();
    activeLink();
}

async function allUserName(){
    let allUsers = JSON.parse(await getItem('userName'));
    currentUserName = await getItem('currentUserName');
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

    let firstInitial = nameArray[0].charAt(0);
    if(nameArray.length === 1) return [firstInitial, ' '];
    let secondInitial = nameArray[1].charAt(0);
    initials.innerHTML = firstInitial + secondInitial;
}

function activeLink() {
    let links = document.querySelectorAll('.nav-mobile-reiter');
    let path = window.location.pathname;
    let page = path.split('/').pop();
    
    links.forEach(link => {
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}




