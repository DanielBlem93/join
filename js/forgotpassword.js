let currentEmail;

async function resetMail() {
    let email = document.getElementById('resetEmail');
    let data = JSON.parse(await getItem('userName'));
    let currentUser = Array.isArray(data) ? data.filter(user => user.email === email.value) : [];

    if(currentUser.length > 0) {
        await setItem('currentEmail', email.value);
        window.location.href = 'newpassword.html'; 
    } else {
        email.classList.add('bg-red');
        setTimeout(function () {
            email.classList.remove('bg-red');
            email.value = '';
        }, 500);
    }
}


