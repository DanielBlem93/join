let data = [];

/**
 * This asynchronous function handles user signup. It retrieves user input (name, email, and password), 
 * stores the new user details, and redirects to 'index.html' once the process is complete. 
 * 
 * @async
 * @function
 * @returns {Promise<void>} Returns a Promise that resolves when the signup process is complete. No return value.
 */

async function loginSignUp(){

    data = JSON.parse(await getItem('userName'));

    console.log(data);

    let email = document.getElementById('signupEmail');
    let password = document.getElementById('signupPassword');
    let loginname = document.getElementById('signupName');
      
    data.push({ name: loginname.value, email: email.value, password: password.value });
    
    await setItem('userName', JSON.stringify(data));
    
    email.value = '';
    password.value = '';
    loginname.value = '';
    window.location.href = 'index.html';
    
}