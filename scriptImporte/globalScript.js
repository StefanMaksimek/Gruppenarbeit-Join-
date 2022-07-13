

function openBoard() {
    closeAllContent()
    document.getElementById('board').className = 'board'
    document.getElementById('board-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h1>Board</h1>`
}


function openBacklog() {
    closeAllContent()
    document.getElementById('backlog').className = 'backlog'
    document.getElementById('backlog-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h1>Backlog</h1>`
}


function openAddTask() {
    closeAllContent()
    document.getElementById('add-task').className = 'add-task'
    document.getElementById('add-task-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h1>Add Task</h1>`

}


function openHelp() {
    closeAllContent()
    document.getElementById('help').className = 'help'
    document.getElementById('help-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h1>Help</h1>`
}


function openSettings() {
    closeAllContent()
    document.getElementById('settings').className = 'settings'
    document.getElementById('settings-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h1>Settings</h1>`
}


function openImpressum() {
    closeAllContent()
    document.getElementById('impressum').className = 'impressum'
    document.getElementById('impressum-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h1>Impressum</h1>`
}


function openDatenschutz() {
    closeAllContent()
    document.getElementById('datenschutz').className = 'datenschutz'
    document.getElementById('datenschutz-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h1>Datenschutz</h1>`
}


function closeAllContent() {
    removeBorderInSidebar()
    closeContentWindows()
    document.getElementById('side-bar').classList.remove('active-mobile-side');
    document.getElementById('burger').classList.remove('toggle');
}


function closeContentWindows() {
    document.getElementById('impressum').className = 'd-none'
    document.getElementById('datenschutz').className = 'd-none'
    document.getElementById('board').className = 'd-none'
    document.getElementById('add-task').className = 'd-none'
    document.getElementById('backlog').className = 'd-none'
    document.getElementById('help').className = 'd-none'
    document.getElementById('settings').className = 'd-none'

}


function removeBorderInSidebar() {
    document.getElementById('board-h3').className = ''
    document.getElementById('backlog-h3').className = ''
    document.getElementById('add-task-h3').className = ''
    document.getElementById('help-h3').className = ''
    document.getElementById('impressum-h3').className = ''
    document.getElementById('datenschutz-h3').className = ''
    document.getElementById('help-h3').className = ''
    document.getElementById('settings-h3').className = ''

}


function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * for switching the themes
 * 
 * @param {*} theme string
 */
function setTheme(theme) {
    document.body.dataset.theme = theme
}


function openMobileSide() {
    document.getElementById('side-bar').classList.toggle('active-mobile-side');
    document.getElementById('burger').classList.toggle('toggle');
}