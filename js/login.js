let currentUser = [];
let currentUserName = '';


/**
 * This asynchronous function handles user login. It retrieves user input (email and password), checks it against stored users,
 * and redirects to 'summary.html' if a match is found. The name of the logged in user is also stored locally.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Returns a Promise that resolves when the process is complete. No return value.
 */
async function login(){
    let email = document.getElementById('loginEmail');
    let password = document.getElementById('loginPassword');

    let data = JSON.parse(await getItem('userName'));
    
    currentUser = Array.isArray(data) ? data.filter(user => user.email === email.value && user.password === password.value) : [];

    if(currentUser.length > 0) {
        currentUserName = currentUser[0].name;
        await setItem('currentUserName', currentUserName);
        window.location.href = 'summary.html';
    }

    email.value = '';
}
    
