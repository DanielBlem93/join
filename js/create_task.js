let task = [];

/**
 * Asynchronous function that creates or updates tasks in storage.
 * 
 * @async
 * @function
 * @param {Object} newTask - The new task object to be added.
 * @returns {Promise<void>} No return value
 * @throws {Error} Throws an error if loading tasks or converting the resulting string to JSON fails.
 */
async function createTaskBackend(newTask) {
    let taskData = await getItem('task');

    // Check if there's data already
    if (!taskData) {
        // If not, initialize the task array
        task = [];
    } else {
        // If yes, parse the existing data
        task = JSON.parse(taskData);
    }

    // Add the new task
    task.push(newTask);

    // Save back to storage
    await setItem('task', JSON.stringify(task));

    console.log('task', task);
}


