let currentDraggedElement;


function renderBoard() {
    renderToDo()
    renderInProgress()
    renderTesting()
    renderDone()
}


function renderToDo() {
    let td = document.getElementById('to-do-holder')

    td.innerHTML = ``
    tasks.filter(task => task.status == "ToDo").forEach(toDos => {
        td.innerHTML += renderToDoHTML(toDos)
    })
}


function renderInProgress() {
    let ip = document.getElementById('in-progress')

    ip.innerHTML = ``
    tasks.filter(task => task.status == "IN PROGRESS").forEach(inProgress => {
        ip.innerHTML += renderInProgressHTML(inProgress)
    })
}


function renderTesting() {
    let t = document.getElementById('testing')

    t.innerHTML = ``
    tasks.filter(task => task.status == "TESTING").forEach(testing => {
        t.innerHTML += renderTestingHTML(testing)
    })
}


function renderDone() {
    let d = document.getElementById('done')

    d.innerHTML = ``
    tasks.filter(task => task.status == "DONE").forEach(done => {
        d.innerHTML += renderDoneHTML(done)
    })
}


function startDragging(title) {
    currentDraggedElement = title

    console.log(currentDraggedElement)
}