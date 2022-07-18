function openBoard() {
    closeAllContent()
    document.getElementById('info').className = 'd-none'
    document.getElementById('board').className = 'board'
    document.getElementById('board-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h2>Board</h2>`
}


function openBacklog() {
    closeAllContent()
    document.getElementById('backlog').className = 'backlog'
    document.getElementById('backlog-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h2>Backlog</h2>`
}


function openAddTask() {
    closeAllContent()
    document.getElementById('add-task').className = 'add-task'
    document.getElementById('add-task-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h2>Add Task</h2>`

}


function openHelp() {
    closeAllContent()
    document.getElementById('help').className = 'help'
    document.getElementById('help-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h2>Help</h2>`
}


function openSettings() {
    closeAllContent()
    document.getElementById('settings').className = 'settings'
    document.getElementById('settings-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h2>Settings</h2>`
}


function openImpressum() {
    closeAllContent()
    document.getElementById('impressum').className = 'impressum'
    document.getElementById('impressum-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h2>Impressum</h2>`
}


function openDatenschutz() {
    closeAllContent()
    document.getElementById('datenschutz').className = 'datenschutz'
    document.getElementById('datenschutz-h3').className = 'active-h3'
    document.getElementById('info-header').innerHTML = `<h2>Datenschutz</h2>`
}


function closeAllContent() {
    document.getElementById('myModal').classList.remove('d-block')
    document.getElementById('show-board-details-container').classList.add('d-none')
    document.getElementById('info').className = 'info-header'
    document.getElementById('side-bar').classList.remove('active-mobile-side');
    document.getElementById('burger').classList.remove('toggle');
    document.getElementById('show-backlog-details-container').classList.add('d-none')
    
    removeBorderInSidebar()
    closeContentWindows()
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
    document.getElementById('myModal').classList.toggle('d-block')
}


// When user clicks anywhere outside of the sidebar, close sidebar
window.onclick = function (event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('side-bar').classList.remove("active-mobile-side")
        document.getElementById('burger').classList.remove('toggle')
        document.getElementById('myModal').classList.remove('d-block')

        document.getElementById('show-backlog-details-container').classList.add('d-none')
        document.getElementById('show-board-details-container').classList.add('d-none')
        document.getElementById('select-employees-container').classList.add('d-none')
        document.getElementById('show-user-details-container').classList.add('d-none')
    }
}


window.addEventListener('resize', _e => {
    if (window.innerWidth > 700) {
        document.getElementById('side-bar').classList.remove("active-mobile-side")
        document.getElementById('burger').classList.remove('toggle')
        document.getElementById('myModal').classList.remove('d-block')
    }
})