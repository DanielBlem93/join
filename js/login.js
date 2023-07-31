let currentUser = [];
let currentUserName;


/**
 * This asynchronous function handles user login. It retrieves user input (email and password), checks it against stored users,
 * and redirects to 'summary.html' if a match is found. The name of the logged in user is also stored locally.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Returns a Promise that resolves when the process is complete. No return value.
 */

/**
 * Get input value from an HTML element by id
 * @param {string} id - HTML element id
 * @returns {string} - Input value
 */
function getInputValue(id) {
    return document.getElementById(id).value;
}

/**
 * Finds a user in the given data array that matches the provided email and password.
 * @param {Array} data - The data array where the search is performed.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Array} - The found user or an empty array.
 */
function findUser(data, email, password) {
    return Array.isArray(data) ? data.filter(user => user.email === email && user.password === password) : [];
}

/**
 * This asynchronous function handles user login. It retrieves user input (email and password), 
 * checks it against stored users, and redirects to 'summary.html' if a match is found. 
 * The name of the logged in user is also stored locally.
 * @async
 * @returns {Promise<void>} - Returns a Promise that resolves when the process is complete. No return value.
 */
async function login() {
    const email = getInputValue('loginEmail');
    const password = getInputValue('loginPassword');
    const data = JSON.parse(await getItem('userName'));
    const currentUser = findUser(data, email, password);

    if (currentUser.length > 0) {
        const currentUserName = currentUser[0].name;
        await setItem('currentUserName', currentUserName);
        window.location.href = 'summary.html';
    } else {
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        
        emailInput.classList.add('bg-red');
        passwordInput.classList.add('bg-red');
        setTimeout(function () {
            emailInput.classList.remove('bg-red');
            passwordInput.classList.remove('bg-red');
            emailInput.value = '';
            passwordInput.value = '';
        }, 500);
    }
}

/**
 * This function handles guest login by storing 'Guest' as the current user name and redirecting to 'summary.html'.
 * @async
 * @returns {Promise<void>} - Returns a Promise that resolves when the process is complete. No return value.
 */
async function guestLogin() {
    const currentUserName = 'Guest';
    await setItem('currentUserName', currentUserName);
    window.location.href = 'summary.html';
}

/**
 * This function fetches and logs all users from the storage.
 * @async
 * @returns {Promise<void>} - Returns a Promise that resolves when the process is complete. No return value.
 */
async function allUsers() {
    const data = JSON.parse(await getItem('userName'));
    console.table(data);
}


/**
 * Adds a class to an HTML element by id
 * @param {string} id - HTML element id
 * @param {string} className - Class to add
 */
function addClassToElement(id, className) {
    document.getElementById(id).classList.add(className);
}

/**
 * This function moves the logo and adjusts the opacities of elements on the 'index.html' page.
 */
function moveLogo() {
    if(window.location.href.includes('index.html')) {
        const movedElements = ['img-container', 'logo-image'];
        const opacityElements = ['login-header', 'login-form', 'indexFooter'];
        
        movedElements.forEach(id => addClassToElement(id, 'movedContainer'));
        opacityElements.forEach(id => addClassToElement(id, 'opacity'));
    }
}
   
