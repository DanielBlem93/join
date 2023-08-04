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


// ---move Logo

/**
 * This function returns "true" if the viewport is less than or equal to 1000 pixels wide, 
 * and will say "false" if the window is wider than that.
 * 
 * @returns 
 */
function getMql() {
    let mql = window.matchMedia("(max-width: 1000px)");
    return mql.matches;
}


/**
 * This function enables the responsive initial animation of the logo.
 */
function moveLogo() {
    if (window.location.href.includes('index.html')) {
        if (getMql() == false) {
            hideOverlay();
            hideLogoMobile();
            moveLogoDesktop();
            showContent();
        } else {
            showOverlay();
            hideOverlayAgain();
            moveLogoDesktop();
            moveLogoMobile();
            showContent();
        };   
    }
}


/**
 * This function enables the movement of the mobile version logo.
 */
function moveLogoMobile(){
    document.getElementById('img-container-mobile').classList.add('movedContainer');
    document.getElementById('logo-image-mobile').classList.add('movedImage');
    document.getElementById('img-container-mobile').classList.add('opacity-none');
    document.getElementById('logo-image-mobile').classList.add('opacity-none');
}


/**
 * This function makes the dark mobile-background disappear after two seconds 
 * so that the fields are functional.
 */
function hideOverlayAgain() {
    setTimeout(hideOverlay, 2000);
    document.getElementById('loginOverlay').classList.add('loginOverlayMobile');
}


/**
 * This function ensures that the elements of the page become visible.
 */
function showContent() {
    document.getElementById('login-header').classList.add('opacity');
    document.getElementById('login-form').classList.add('opacity');
    document.getElementById('indexFooter').classList.add('opacity');
}


/**
 * This function ensures the movement of the standard version logo
 */
function moveLogoDesktop() {
    document.getElementById('img-container').classList.add('movedContainer');
    document.getElementById('logo-image').classList.add('movedImage');
}


/**
 * This function hides the mobile version of the logo.
 */
function hideLogoMobile() {
    document.getElementById('img-container-mobile').classList.add('display-none');
}


/**
 * This function shows the mobile version of the logo.
 */
function showLogoMobile() {
    document.getElementById('img-container-mobile').classList.remove('display-none');
}


/**
 * This function hides the mobile background.
 */
function hideOverlay() {
    document.getElementById('loginOverlay').classList.add('display-none');
}


/**
 * This function shows the mobile background.
 */
function showOverlay() {
    document.getElementById('loginOverlay').classList.remove('display-none');
}