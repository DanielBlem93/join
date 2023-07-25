let task = [];


async function createTask(){
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let date = document.getElementById("date");

    task = JSON.parse(await getItem('task'));

    task.push({ title: title.value, description: description.value, date: date.value });

    await setItem('task', JSON.stringify(task));


    // console.log(title.value);
    
    // console.log(description.value);
    // console.log(categorys.category);
    // console.log(date.value);
}
function clearTask (){
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let date = document.getElementById("date");
    title.value = "";
    description.value = "";
    date.value = "";
    // console.log("cleareTask");
}