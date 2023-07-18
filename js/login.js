let currentUser = [];
let currentUserName = '';

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
}
    