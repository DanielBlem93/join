
function showTodo(id) {
    const todo = todos.find(t => t['id'] === id);
    console.log(todo['id']);
    let modalTodo = document.getElementById('showTodo');
    modalTodo.classList.remove('displayNone');
    modalTodo.innerHTML = '';
    modalTodo.innerHTML = ``;
    modalTodo.innerHTML += generateToDoHTMLModal(todo); 
}

function generateToDoHTMLModal(todo) {
    return /*html*/ `
    <div class="modal-content">
            <div onclick="closeModalBord()" class="modal-close">
                <img src="./assets/img/close-icon.png" alt="">
            </div>
    <h4>${todo['task-category']}</h4>
    <h3>${todo['title']}</h3>
    <p>${todo['date']}</p>
    <p>${todo['text']}</p>
    <p>${todo['members']}</p>
    <div onclick="deleteTodo(${todo['id']})" class="todo-delete">
            <img src="./assets/img/delete.png" alt="">
    </div>
    </div>`;
}

function closeModalBord() {
    let modalTodo = document.getElementById('showTodo');
    modalTodo.classList.add('displayNone');
}

async function deleteTodo(id) {
    let taskList = JSON.parse(await getItem('task'));
   // await setItem('task', JSON.stringify(taskList));

    for (let i = 0; i < taskList.length; i++) {
        let taskArray = taskList[i];
        let index = taskArray.findIndex(task => task.taskID === id);
        if (index > -1) {
            taskArray.splice(index, 1);
            await setItem('task', JSON.stringify(taskList));
            await addTask();
            updateHTML();
            return;
        }
    }

    console.error('Todo with id ' + id + ' not found in the task file');
}


