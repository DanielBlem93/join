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

async function getUserName(userName){
    let name = document.getElementById('summaryGreetingName');
    userName = await getItem('currentUserName');
    
    name.innerHTML = userName;
}