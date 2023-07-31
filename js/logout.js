/**
 * Retrieve an item from local storage based on key.
 * @param {string} key - The key under which the data is stored.
 * @returns {Promise<any>} - The data retrieved from storage.
 */
async function getItem(key) {
    return localStorage.getItem(key);
}

/**
 * Store an item in local storage with a specific key.
 * @param {string} key - The key under which to store the data.
 * @param {any} value - The data to store.
 * @returns {Promise<void>} - Returns a promise that resolves when the data is stored.
 */
async function setItem(key, value) {
    localStorage.setItem(key, value);
}

/**
 * This asynchronous function handles user logout. It retrieves the current user's name from storage,
 * resets it, and redirects to 'index.html'.
 * @async
 * @returns {Promise<void>} - Returns a Promise that resolves when the process is complete. No return value.
 */
async function logout(){
    let currentUserName = await getItem('currentUserName');
    console.log(currentUserName);
    await setItem('currentUserName', '');
    window.location.href = 'index.html';
}
