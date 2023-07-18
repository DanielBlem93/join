
const Tasks =  document.querySelectorAll('.summary-task');
Tasks.forEach(task => {
    task.addEventListener('click', () => {
        window.location.href = 'board.html';
    })
});



async function getUserName(userName){
    let name = document.getElementById('summaryGreetingName');
    userName = await getItem('currentUserName');
    
    name.innerHTML = userName;
}