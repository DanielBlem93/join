async function logout(){
    currentUserName = await getItem('currentUserName');
    console.log(currentUserName);
    currentUserName = '';
    await setItem('currentUserName', currentUserName);
    //console.log(currentUserName);
    window.location.href = 'index.html';
}