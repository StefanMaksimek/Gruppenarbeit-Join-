let currentDraggedElement;
let startedTasks = []


function renderBoard() {
    startedTasks = tasks.filter(t => t.statusTask == "board") // load all tasks for board in an temporary Array

    renderToDo()
    renderInProgress()
    renderTesting()
    renderDone()
    startedTasks.sort((a, b) => (a.id > b.id ? 1 : -1))
}


function renderToDo() {
    let td = document.getElementById('to-do')

    td.innerHTML = ``
    startedTasks.filter(task => task.status == "to-do").forEach(toDos => {
        td.innerHTML += renderToDoHTML(toDos)
        let id = toDos.id

        for (let i = 0; i < toDos.user.length; i++) {
            const user = toDos.user[i];
            document.getElementById(`board-card-usericon${toDos.id}`).innerHTML += `<div style="left: calc(10px + 20px*${i})" class="assigned-to-user board-user-icon">
            <img onclick="showUserDetails('${user.name}')" src="${user.icon}">            
        </div>`
        }
    })
}


function renderInProgress() {
    let ip = document.getElementById('in-progress')

    ip.innerHTML = ``
    startedTasks.filter(task => task.status == "in-progress").forEach(inProgress => {
        ip.innerHTML += renderInProgressHTML(inProgress)
        for (let i = 0; i < inProgress.user.length; i++) {
            const user = inProgress.user[i];
            document.getElementById(`board-card-usericon${inProgress.id}`).innerHTML += `<div style="left: calc(10px + 20px*${i})" class="assigned-to-user board-user-icon">
            <img onclick="showUserDetails('${user.name}')" src="${user.icon}">            
        </div>`
        }
    })
}


function renderTesting() {
    let t = document.getElementById('testing')

    t.innerHTML = ``
    startedTasks.filter(task => task.status == "testing").forEach(testing => {
        t.innerHTML += renderTestingHTML(testing)

        for (let i = 0; i < testing.user.length; i++) {
            const user = testing.user[i];
            document.getElementById(`board-card-usericon${testing.id}`).innerHTML += `<div style="left: calc(10px + 20px*${i})" class="assigned-to-user board-user-icon">
            <img onclick="showUserDetails('${user.name}')" src="${user.icon}">            
        </div>`
        }
    })
}


function renderDone() {
    let d = document.getElementById('done')

    d.innerHTML = ``
    startedTasks.filter(task => task.status == "done").forEach(done => {
        d.innerHTML += renderDoneHTML(done)

        for (let i = 0; i < done.user.length; i++) {
            const user = done.user[i];
            document.getElementById(`board-card-usericon${done.id}`).innerHTML += `<div style="left: calc(10px + 20px*${i})" class="assigned-to-user board-user-icon">
            <img onclick="showUserDetails('${user.name}')" src="${user.icon}">            
        </div>`
        }
    })
}


function startDragging(id) {
    currentDraggedElement = id
}


function moveTo(status) {
    tasks.find(task => task.id == currentDraggedElement).status = status //change the status in main JSON
    uploadTasks()
    renderBoard()
    removeHighlight(status)
}


function highlight(id) {
    document.getElementById(id).parentElement.classList.add('drag-area-highlight')
}


function removeHighlight(id) {
    document.getElementById(id).parentElement.classList.remove('drag-area-highlight')
}


function openTaskDetails(id) {
    document.getElementById('myModal').classList.add('d-block')
    document.getElementById('show-board-details-container').classList.remove('d-none')

    fillBoardDetailBox(id)

}


function fillBoardDetailBox(id) {
    let task = tasks.find(e => e.id == id)

    document.getElementById('show-board-details-box-icon').innerHTML = '';
    task.user.forEach(e => {
        document.getElementById('show-board-details-box-icon').innerHTML += addUserIconsHTML(e)
    });

    document.getElementById('show-board-details-container').style = `border : 2px solid var(--clr-${task.category})`
    document.getElementById('show-board-details-box-icon').src = task.user[0].icon
    document.getElementById('show-board-details-box-category').innerHTML = task.category
    document.getElementById('show-board-details-box-title').innerHTML = task.title
    document.getElementById('show-board-details-box-details').innerHTML = task.description


    document.getElementById('show-board-details-box-created-on').innerHTML = new Date(task.createdAt).toISOString().substring(0, 10)
    document.getElementById('show-board-details-box-complete-by').innerHTML = new Date(task.dueDate).toISOString().substring(0, 10)
    document.getElementById('show-board-details-box-urgency').innerHTML = task.priority

}


function closeBoardDetails() {
    document.getElementById('myModal').classList.remove('d-block')
    document.getElementById('show-board-details-container').classList.add('d-none')
}


function openOrCloseSidebarCreateTask() {
    if (document.getElementById('side-bar-task').classList.contains('d-none')) {
        document.getElementById('side-bar-task').classList.remove('d-none')
    }
    else {
        document.getElementById('side-bar-task').classList.add('d-none')
    }
}