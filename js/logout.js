async function logout(){
    currentUserName = await getItem('currentUserName');
    currentUserName = '';
    await setItem('currentUserName', currentUserName);
    window.location.href = '/join/index.html';
}