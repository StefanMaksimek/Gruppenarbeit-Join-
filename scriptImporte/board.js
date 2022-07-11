let currentDraggedElement;


function renderBoard() {
    renderToDo()
    renderInProgress()
    renderTesting()
    renderDone()
    x.sort((a, b) => (a.id > b.id ? 1 : -1))
}


function renderToDo() {
    let td = document.getElementById('to-do')

    td.innerHTML = ``
    x.filter(task => task.status == "to-do").forEach(toDos => {
        td.innerHTML += renderToDoHTML(toDos)
    })
}


function renderInProgress() {
    let ip = document.getElementById('in-progress')

    ip.innerHTML = ``
    x.filter(task => task.status == "in-progress").forEach(inProgress => {
        ip.innerHTML += renderInProgressHTML(inProgress)
    })
}


function renderTesting() {
    let t = document.getElementById('testing')

    t.innerHTML = ``
    x.filter(task => task.status == "testing").forEach(testing => {
        t.innerHTML += renderTestingHTML(testing)
    })
}


function renderDone() {
    let d = document.getElementById('done')

    d.innerHTML = ``
    x.filter(task => task.status == "done").forEach(done => {
        d.innerHTML += renderDoneHTML(done)
    })
}


function startDragging(id) {
    currentDraggedElement = id

    console.log(currentDraggedElement)
}


function moveTo(status) {
    x[currentDraggedElement].status = status
    
    renderBoard()
    removeHighlight(status)
}


function highlight(id) {
    document.getElementById(id).parentElement.classList.add('drag-area-highlight')
}


function removeHighlight(id) {
    document.getElementById(id).parentElement.classList.remove('drag-area-highlight')
}