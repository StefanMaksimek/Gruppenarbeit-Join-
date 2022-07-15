

function renderBacklog() {
    let bc = document.getElementById('backlog-content')

    bc.innerHTML = ``
    tasks.reverse().forEach(task => {
        bc.innerHTML += renderBacklogHTML(task)
    });
    tasks.reverse()
}
