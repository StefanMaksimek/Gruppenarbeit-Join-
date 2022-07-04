function openBoard() {
    closeAllContent()
    document.getElementById('board').className = 'board'
    document.getElementById('board-h3').className = 'active-h3'
}


function openBacklog() {
    closeAllContent()
    document.getElementById('backlog').className = 'backlog'
    document.getElementById('backlog-h3').className = 'active-h3'
}


function openAddTask() {
    closeAllContent()
    document.getElementById('add-task').className = 'add-task'
    document.getElementById('add-task-h3').className = 'active-h3'
}


function openImpressum() {
    closeAllContent()
    document.getElementById('impressum').className = 'impressum'
    document.getElementById('impressum-h3').className = 'active-h3'
}


function openDatenschutz() {
    closeAllContent()
    document.getElementById('datenschutz').className = 'datenschutz'
    document.getElementById('datenschutz-h3').className = 'active-h3'
}


function closeAllContent() {
    document.getElementById('impressum').className = 'd-none'
    document.getElementById('datenschutz').className = 'd-none'
    document.getElementById('board').className = 'd-none'
    document.getElementById('add-task').className = 'd-none'
    document.getElementById('backlog').className = 'd-none'

    document.getElementById('board-h3').className = ''
    document.getElementById('backlog-h3').className = ''
    document.getElementById('add-task-h3').className = ''
    document.getElementById('help-h3').className = ''
    document.getElementById('impressum-h3').className = ''
    document.getElementById('datenschutz-h3').className = ''
}