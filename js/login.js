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




async function login(){
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    let data = JSON.parse(await getItem('userName'));
    let currentUser = Array.isArray(data) ? data.filter(user => user.email === email && user.password === password) : [];

    if(currentUser.length > 0) {
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

async function guestLogin(){
    currentUserName = 'Guest';
    await setItem('currentUserName', currentUserName);
    window.location.href = 'summary.html';
}

    
