

function renderBacklog() {
    let bc = document.getElementById('backlog-content')

    bc.innerHTML = ``
   x.reverse().forEach(task => {
        bc.innerHTML += renderBacklogHTML(task)
    });
    x.reverse()
}


function moveTo(status) {
    x[currentDraggedElement].status = status
    renderBoard()
}