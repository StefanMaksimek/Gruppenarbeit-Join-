

function renderBacklog() {
    let bc = document.getElementById('backlog-content')
    let tasksInBacklog = tasks.filter(t => t.locationTask == "backlog")

    bc.innerHTML = ``
    tasksInBacklog.reverse().forEach(task => {
        bc.innerHTML += renderBacklogHTML(task)
        if (task.user.length > 1) {
            document.getElementById(`assigned-to-${task.id}`).innerHTML += addUserInfoHTML(task)
        }
    });
    tasksInBacklog.reverse()
}


function openAcceptTask(id) {
    document.getElementById('myModal').classList.add('d-block')
    document.getElementById('show-backlog-details-container').classList.remove('d-none')

    fillBaacklogDetailBox(id)

}


function fillBaacklogDetailBox(id) {
    let task = tasks.find(e => e.id == id)

    document.getElementById('show-backlog-details-box-icon').innerHTML = '';
    task.user.forEach(e => {
        document.getElementById('show-backlog-details-box-icon').innerHTML += addUserIconsHTML(e)
    });

    document.getElementById('show-backlog-details-container').style = `border : 2px solid var(--clr-${task.category})`
    document.getElementById('show-backlog-details-box-icon').src = task.user[0].icon
    document.getElementById('show-backlog-details-box-category').innerHTML = task.category
    document.getElementById('show-backlog-details-box-title').innerHTML = task.title
    document.getElementById('show-backlog-details-box-details').innerHTML = task.description
    document.getElementById('btn-holder-backlog').innerHTML = `<button class="push-task" style="background-color: red" onclick="deleteTask(${id})">Delete Task</button><button class="push-task" style="background-color: var(--clr-${task.category})" onclick="pushTask(${id}, '')">Accept Task</button>`
}


function closeBacklogDetails() {
    document.getElementById('myModal').classList.remove('d-block')
    document.getElementById('show-backlog-details-container').classList.add('d-none')
}


function deleteTask(id) {
    let currentTask = tasks.find(t => t.id == id);
    let index = tasks.indexOf(currentTask);
    tasks.splice(index, 1);
    uploadTasks();
    renderBacklog();
    closeBacklogDetails();
}


function pushTask(id, statusTask) {
    let currentTask = tasks.find(t => t.id == id);

    currentTask.locationTask = "board";
    setColorAndStatus(currentTask, statusTask)
    uploadTasks()
    closeBacklogDetails()
    renderBoard()
    renderBacklog()
    openBoard()
}


function setColorAndStatus(currentTask, statusTask) {
    if (statusTask == '') {
        currentTask.status = document.getElementById('status-list-input').value;
    }
    else {
        currentTask.status = statusTask;
    }
    currentTask.color = temporaryArrayColor[0];
}