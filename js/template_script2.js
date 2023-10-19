/**
 * Initializes the application by including HTML, retrieving user names, setting initials, and more.
 * Also ensures that the currently logged in user has the appropriate access.
 * 
 * @returns {Promise<void>}
 */
async function init() {
    
    await includeHTML();
    await getUserName();
    await allUserName();
    await setInitials();
    await allUsers();
    validateName();
    activeLink();
}


/**
 * Validates the current user's name. If the user's name is 'noaccess', the user is redirected to the index page.
 */
function validateName() {
    if (currentUserName === 'noaccess') {
        window.location.href = 'index.html';
    }
}


/**
 * Fetches and assigns the list of all user names and the current user's name.
 * 
 * @returns {Promise<void>}
 */
async function allUserName(){
    let allUsers = JSON.parse(await getItem('userName'));
    currentUserName = await getItem('currentUserName');
}


/**
 * Toggles the visibility of the logout button.
 */
function showLogout() {
    let logout = document.getElementById('logout');
    if (logout.classList.contains('hidden-logout-btn')) {
        logout.classList.remove('hidden-logout-btn');
        logout.style.display = 'block';
        logout.disabled = false;
    } else {
        logout.classList.add('hidden-logout-btn');
        logout.style.display = 'none';
        logout.disabled = true;
    }
}



/**
 * Includes the HTML content for elements with the attribute 'w3-include-html'.
 * The value of the attribute should be the path to the HTML file.
 * 
 * @returns {Promise<void>}
 */
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


/**
 * Sets the initials of the current user based on their name.
 * The initials are displayed in an element with the id 'temp-initials'.
 * 
 * @returns {Promise<void>}
 */
async function setInitials() {
    let initials = document.getElementById('temp-initials');
    let userName = await getItem('currentUserName');
    let nameArray = userName.split(' ');

    let firstInitial = nameArray[0].charAt(0);
    if(nameArray.length === 1) return [firstInitial, ' '];
    let secondInitial = nameArray[1].charAt(0);
    initials.innerHTML = firstInitial + secondInitial;
}


/**
 * Sets the 'active' class on the appropriate navigation link based on the current page's path.
 */
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