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

    let email = document.getElementById('signupEmail');
    let password = document.getElementById('signupPassword');
    let loginname = document.getElementById('signupName');
    let id = Math.random().toString(36).substr(2) + Date.now().toString(36);
      
    data.push({ name: loginname.value, email: email.value, password: password.value, id: id });
    
    await setItem('userName', JSON.stringify(data));

    await cleanUpData();
    
    email.value = '';
    password.value = '';
    loginname.value = '';
    window.location.href = 'index.html';
    
}
async function cleanUpData() {
    let data = JSON.parse(await getItem('userName'));

    // Filtern Sie die Daten, um nur Elemente mit einer ID zu behalten
    let cleanedData = data.filter(user => user.id != null && user.id !== '');

    // Setzen Sie den bereinigten Datensatz zurück
    await setItem('userName', JSON.stringify(cleanedData));
}



