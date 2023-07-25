async function reset(){
    let newPw = document.getElementById('newPw');
    let confirm = document.getElementById('confirm');
    let email = await getItem('currentEmail');

    if(newPw.value === confirm.value) {
        let data = JSON.parse(await getItem('userName'));
        let currentUser = Array.isArray(data) ? data.filter(user => user.email === email) : [];
        currentUser[0].password = newPw.value;
        await setItem('userName', JSON.stringify(data));
        window.location.href = 'index.html';
    } else {
        newPw.classList.add('bg-red');
        confirm.classList.add('bg-red');
        setTimeout(function () {
            newPw.classList.remove('bg-red');
            confirm.classList.remove('bg-red');
            newPw.value = '';
            confirm.value = '';
        }, 500);
    }
    console.log(email);
}