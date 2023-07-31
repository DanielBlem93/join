let currentEmail;

async function resetMail() {
    let email = document.getElementById('resetEmail');
    let data = JSON.parse(await getItem('userName'));
    let currentUser = Array.isArray(data) ? data.filter(user => user.email === email.value) : [];
    
    let button = document.getElementById('submitButton'); 
    let image = document.getElementById('successImage'); 

    if(currentUser.length > 0) {
        await setItem('currentEmail', email.value);
        button.style.display = 'none';
        image.classList.add('show');
        setTimeout(() => {
            window.location.href = 'newpassword.html';
        }, 2000);
    } else {
        email.classList.add('bg-red');
        setTimeout(function () {
            email.classList.remove('bg-red');
            email.value = '';
        }, 500);
    }
}



