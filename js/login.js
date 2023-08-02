/** 
 * An array to store the details of the current user.
 * @type {Array} 
 */
let currentUser = [];

/** 
 * A string to store the name of the current user.
 * @type {string}
 */
let currentUserName;


/**
 * This asynchronous function handles user login. It retrieves user input (email and password), checks it against stored users,
 * and redirects to 'summary.html' if a match is found. The name of the logged in user is also stored locally.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Returns a Promise that resolves when the process is complete. No return value.
 */
async function login() {

    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    let data = JSON.parse(await getItem('userName'));
    let currentUser = Array.isArray(data) ? data.filter(user => user.email === email && user.password === password) : [];

    if (currentUser.length > 0) {
        currentUserName = currentUser[0].name;
        await setItem('currentUserName', currentUserName);
        window.location.href = 'summary.html';
    } else {
        document.getElementById('loginEmail').classList.add('bg-red');
        document.getElementById('loginPassword').classList.add('bg-red');
        setTimeout(function () {
            document.getElementById('loginEmail').classList.remove('bg-red');
            document.getElementById('loginPassword').classList.remove('bg-red');
        }, 500);
    }
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
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
 * This asynchronous function retrieves all users and displays their information in a console table.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Returns a Promise that resolves when the process is complete. No return value.
 */
function moveLogo() {
    if (window.location.href.includes('index.html')) {
        document.getElementById('loginOverlay').classList.add('opacity-none');
        document.getElementById('img-container').classList.add('movedContainer');
        document.getElementById('logo-image').classList.add('movedImage');
        document.getElementById('img-container-mobile').classList.add('movedContainer');
        document.getElementById('logo-image-mobile').classList.add('movedImage');
        document.getElementById('login-header').classList.add('opacity');
        document.getElementById('login-form').classList.add('opacity');
        document.getElementById('indexFooter').classList.add('opacity');
        
    }
}    
