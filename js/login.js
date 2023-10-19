/**
 * This asynchronous function handles user login. It retrieves user input (email and password), checks it against stored users,
 * and redirects to 'summary.html' if a match is found. The name of the logged in user is also stored locally.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Returns a Promise that resolves when the process is complete. No return value.
 */
async function login() {
    let email = document.getElementById('loginEmail');
    let password = document.getElementById('loginPassword');
    if (!validateInput(email, password)) {
        return;
    }
    let data = JSON.parse(await getItem('userName')) || [];
    let currentUser = Array.isArray(data) ? data.filter(user => user.email === email.value && user.password === password.value) : [];
    if (currentUser.length > 0) {
        currentUserName = currentUser[0].name;
        await setItem('currentUserName', currentUserName);
        window.location.href = 'summary.html';
    } else {
        displayError('emailError', 'Ungültige E-Mail oder Passwort');
        displayError('passwordError', 'Ungültige E-Mail oder Passwort');
    }
    email.value = '';
    password.value = '';
}


/**
 * Validates user input, ensuring that the email and password fields are not empty. 
 * This function displays an error message under the relevant input field if a field is invalid.
 *
 * @function
 * @param {HTMLInputElement} email - The email input element.
 * @param {HTMLInputElement} password - The password input element.
 * @returns {boolean} Returns true if all input fields are valid, false otherwise.
 */
function validateInput(email, password) {
    let isValid = true;
    if (email.value === '') {
        displayError('emailError', 'Please fill out the email field.');
        isValid = false;
    }
    if (password.value === '') {
        displayError('passwordError', 'Please fill out the password field.');
        isValid = false;
    }
    return isValid;
}


/**
 * This asynchronous function allows guest users to login by simply setting the current user name as 'Guest'.
 * It then redirects the user to 'summary.html'.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Returns a Promise that resolves when the process is complete. No return value.
 */
async function guestLogin() {
    currentUserName = 'Guest';
    await setItem('currentUserName', currentUserName);
    window.location.href = 'summary.html';
}


/**
 * This asynchronous function retrieves all users and displays their information in a console table.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Returns a Promise that resolves when the process is complete. No return value.
 */
async function allUsers() {
    let data = JSON.parse(await getItem('userName'));
}


/**
 * Toggles a CSS class for an HTML element by its id.
 * Adds the class if `add` is true, removes it otherwise.
 * 
 * @param {string} id - The id of the HTML element.
 * @param {string} className - The CSS class to add or remove.
 * @param {boolean} [add=true] - Whether to add or remove the class.
 * 
 * @example
 * toggleClassById('myElement', 'active', true);  // Adds the 'active' class to the element with id 'myElement'
 */
function toggleClassById(id, className, add = true) {
    const element = document.getElementById(id);
    if (element) {
        if (add) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    }
}


/**
 * Checks if the window width is less than or equal to 1000px.
 * 
 * @returns {boolean} True if window width is <= 1000px, false otherwise.
 */
function getMql() {
    return window.matchMedia("(max-width: 1000px)").matches;
}


/**
 * Moves and modifies the logo and related elements based on the screen size.
 * This function is intended to be used only on pages that include 'index.html' in their URL.
 * 
 * @example
 * moveLogo();  // Will move and modify elements if on a page with 'index.html' in its URL.
 */
function moveLogo() {
    if (!window.location.href.includes('index.html')) {
        return;
    }
    const isMobile = getMql();
    toggleClassById('loginOverlay', 'loginOverlayMobile', isMobile);
    toggleClassById('loginOverlay', 'display-none', !isMobile);
    toggleClassById('img-container-mobile', 'display-none', !isMobile);
    ['img-container', 'logo-image', 'img-container-mobile', 'logo-image-mobile'].forEach(id => {
        toggleClassById(id, 'movedContainer');
        toggleClassById(id, 'movedImage');
        toggleClassById(id, 'opacity-none', isMobile);
    });
    ['login-header', 'login-form', 'indexFooter'].forEach(id => {
        toggleClassById(id, 'opacity');
    });
    if (isMobile) {
        setTimeout(() => toggleClassById('loginOverlay', 'display-none', false), 2000);
    }
}