

function renderBacklog() {
    let bc = document.getElementById('backlog-content')

    bc.innerHTML = ``
    tasks.reverse().forEach(task => {
        bc.innerHTML += renderBacklogHTML(task)
    });
    tasks.reverse()
}


function openAcceptTask(id) {
    document.getElementById('myModal').classList.add('d-block')
    document.getElementById('show-backlog-details-container').classList.remove('d-none')

    fillBaacklogDetailBox(id)

}


function fillBaacklogDetailBox(id) {
    document.getElementById('show-backlog-details-box-icon').src = tasks.find(task => task.id == id).user[0].icon
    document.getElementById('show-backlog-details-box-assigned-to').innerHTML = tasks.find(task => task.id == id).user[0].name
    document.getElementById('show-backlog-details-box-category').innerHTML = tasks.find(task => task.id == id).category
    document.getElementById('show-backlog-details-box-title').innerHTML = tasks.find(task => task.id == id).title
    document.getElementById('show-backlog-details-box-details').innerHTML = tasks.find(task => task.id == id).description

    document.getElementById('btn-holder-backlog').innerHTML = `<button id="push-task" onclick="pushTask(${id})">Accept Task</button>`
}


function closeBacklogDetails() {
    document.getElementById('myModal').classList.remove('d-block')
    document.getElementById('show-backlog-details-container').classList.add('d-none')
}


function pushTask(id) {
    let i = tasks.findIndex(task => task.id == id)
    startedTasks.push(tasks.find( task => task.id == id))
    tasks.splice(i, 1)
    renderBoard()
    renderBacklog()
    openBoard()

    closeBacklogDetails()

}