let data = [];

/**
 * This function validates user input. It ensures all fields are filled and the name contains both first and last name.
 * If a field is not valid, it displays an information box under the input field.
 *
 * @function
 * @returns {boolean} Returns true if all inputs are valid, false otherwise.
 */
function validateInput(email, password, loginname) {
    // Überprüfen Sie, ob alle Felder ausgefüllt sind
    if (email.value === '' || password.value === '' || loginname.value === '') {
        alert('Bitte füllen Sie alle Felder aus.');
        return false;
    }

    // Überprüfen Sie, ob der Name sowohl den Vornamen als auch den Nachnamen enthält
    let nameParts = loginname.value.split(' ');
    if (nameParts.length < 2) {
        alert('Bitte geben Sie sowohl Vorname als auch Nachname ein.');
        return false;
    }

    return true;
}

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

    if (!validateInput(email, password, loginname)) {
        return;
    }
      
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
    let cleanedData = data.filter(user => user.password != null && user.password !== '');
    await setItem('userName', JSON.stringify(cleanedData));
}


function displayError(elementId, message) {
    let element = document.getElementById(elementId);
    element.textContent = message;
    setTimeout(() => {
        element.textContent = '';
    }, 2000);
}

function validateInput(email, password, loginname) {
    let isValid = true;
    if (email.value === '') {
        displayError('emailError', 'Please fill out the email field.');
        isValid = false;
    }
    if (password.value === '') {
        displayError('passwordError', 'Please fill out the password field.');
        isValid = false;
    }
    let nameParts = loginname.value.split(' ');
    if (nameParts.length < 2) {
        displayError('nameError', 'Please enter both first and last name.');
        isValid = false;
    }
    return isValid;
}






