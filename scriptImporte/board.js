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
    })
}


function renderInProgress() {
    let ip = document.getElementById('in-progress')

    ip.innerHTML = ``
    startedTasks.filter(task => task.status == "in-progress").forEach(inProgress => {
        ip.innerHTML += renderInProgressHTML(inProgress)
    })
}


function renderTesting() {
    let t = document.getElementById('testing')

    t.innerHTML = ``
    startedTasks.filter(task => task.status == "testing").forEach(testing => {
        t.innerHTML += renderTestingHTML(testing)
    })
}


function renderDone() {
    let d = document.getElementById('done')

    d.innerHTML = ``
    startedTasks.filter(task => task.status == "done").forEach(done => {
        d.innerHTML += renderDoneHTML(done)
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