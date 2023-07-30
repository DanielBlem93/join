let task = [];

async function createTaskBackend(newTask) {
    let taskData = await getItem('task');
    task = JSON.parse(taskData);

    task.push(newTask);

    await setItem('task', JSON.stringify(task));
    console.log('task', task);
}

