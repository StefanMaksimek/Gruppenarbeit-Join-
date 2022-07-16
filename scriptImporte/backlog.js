

function renderBacklog() {
    let bc = document.getElementById('backlog-content')
    let tasksInBacklog = tasks.filter(t => t.statusTask == "backlog")

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
    document.getElementById('btn-holder-backlog').innerHTML = `<button id="push-task" style="background-color: var(--clr-${task.category})" onclick="pushTask(${id})">Accept Task</button>`
}


function closeBacklogDetails() {
    document.getElementById('myModal').classList.remove('d-block')
    document.getElementById('show-backlog-details-container').classList.add('d-none')
}


function pushTask(id) {
    let currentTask = tasks.find(t => t.id == id);
    currentTask.statusTask = "board";
    /* let i = tasks.findIndex(task => task.id == id)
     startedTasks.push(tasks.find( task => task.id == id))
     tasks.splice(i, 1)*/
    uploadTasks()
    //uploadStartedTasks()
    renderBoard()
    renderBacklog()
    openBoard()

    closeBacklogDetails()

}

/*function pushTaskToBoard(id)
let currentTask = tasks.find(t => t.id == id);
currentTask.statusTask = "board";

...
*/
