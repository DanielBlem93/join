let data = [];

async function loginSignUp(){

    data = JSON.parse(await getItem('userName'));

    let email = document.getElementById('signupEmail');
    let password = document.getElementById('signupPassword');
    let loginname = document.getElementById('signupName');

    console.log(data);
    console.log(email.value);
    console.log(password.value);
    console.log(name.value);

      
     data.push({ 
        name: loginname.value, 
        email: email.value, 
        password: password.value });
    
      await setItem('userName', JSON.stringify(data));
      console.log(data);
    
      email.value = '';
      password.value = '';
      loginname.value = '';
      window.location.href = 'index.html';
    
}