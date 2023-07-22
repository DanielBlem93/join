/**
 * For each task element with the class 'summary-task', an event listener is added. 
 * When a task element is clicked, the user is redirected to the 'board.html' page.
 */
const Tasks =  document.querySelectorAll('.summary-task');
Tasks.forEach(task => {
    task.addEventListener('click', () => {
        window.location.href = 'board.html';
    })
});



/**
 * This asynchronous function retrieves the current user's name from local storage and updates the element with ID 'summaryGreetingName'.
 * 
 * @async
 * @function
 * @param {string} userName - A placeholder parameter that gets overwritten by the current user's name from local storage.
 * @returns {Promise<void>} Returns a Promise that resolves when the operation is complete. No return value.
 */
async function getUserName(){
    if(window.location.href.includes('summary.html')){
    let name = document.getElementById('summaryGreetingName');
    let userName = await getItem('currentUserName');
    
    name.innerHTML = userName;
    }
}


/**
 * An asynchronous function for setting the initials of a username.
 * The username is retrieved from local storage and the initials are set in the DOM element with id 'temp-initials'.
 *
 * @async
 * @function
 * @returns {Promise<void>} Returns a Promise that is fulfilled when the username has been retrieved and the initials have been set.
 * @throws {Error} If the username cannot be retrieved from local storage or if the username is not in the proper format.
 */


async function setInitials() {
    let initials = document.getElementById('temp-initials');
    let userName = await getItem('currentUserName');
    let nameArray = userName.split(' ');
    let firstInitial = nameArray[0].charAt(0);
    if(nameArray.length === 1) return [firstInitial, ' '];
    let secondInitial = nameArray[1].charAt(0);
    initials.innerHTML = firstInitial + secondInitial;
}




