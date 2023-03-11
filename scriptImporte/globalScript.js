function openBoard() {
    closeAllContent();
    document.getElementById('board').classList.remove('d-none');
    setTemporaryArrayResponsibleEmployeesToStandard();
}


function openBacklog() {
    closeAllContent();
    document.getElementById('backlog').classList.remove('d-none');
    setTemporaryArrayResponsibleEmployeesToStandard();
}


function openAddTask() {
    closeAllContent();
    document.getElementById('add-task').classList.remove('d-none');
    setTemporaryArrayResponsibleEmployeesToStandard();
}

function openContact() {
    //
}


function openHelp() {
    closeAllContent()
    document.getElementById('help').classList.remove('d-none');
}


function openSettings() {
    closeAllContent();
    document.getElementById('settings').classList.remove('d-none');
}


function openImpressum() {
    closeAllContent();
    document.getElementById('impressum').classList.remove('d-none');
}


function openDatenschutz() {
    closeAllContent();
    document.getElementById('datenschutz').classList.remove('d-none');
}


function openContacts() {
    closeAllContent();
    document.getElementById('contacts').classList.remove('d-none');
    loadUserListForContacts();
}


function openSummary() {
    closeAllContent();
    document.getElementById('summary').classList.remove('d-none');
    loadSummaryContent();
}


function closeAllContent() {
    document.getElementById('myModal').classList.remove('d-block');
    document.getElementById('show-board-details-container').classList.add('d-none');
    document.getElementById('side-bar').classList.remove('active-mobile-side');
    document.getElementById('burger').classList.remove('toggle');
    document.getElementById('show-backlog-details-container').classList.add('d-none');
    document.getElementById('summary').classList.add('d-none');
    closeContentWindows();
}


function closeContentWindows() {
    document.getElementById('impressum').classList.add('d-none');
    document.getElementById('board').classList.add('d-none');
    document.getElementById('add-task').classList.add('d-none');
    document.getElementById('backlog').classList.add('d-none');
    document.getElementById('help').classList.add('d-none');
    document.getElementById('contacts').classList.add('d-none');
    closeUrgentDetails()
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
    changeAddTaskItemsOnBoard(theme);
}


function changeAddTaskItemsOnBoard(theme) {
    let imagesAddTaskBoard = document.getElementsByClassName('card-header-add-icon-img');
    for (let i = 0; i < imagesAddTaskBoard.length; i++) {
        const img = imagesAddTaskBoard[i];
        if (theme == 'dark') {
            img.src = './img/add-task-icon-white.png';
        }
        else {
            img.src = './img/add-task-icon.png';
        }
    }
}


function openMobileSide() {
    document.getElementById('side-bar').classList.toggle('active-mobile-side');
    document.getElementById('burger').classList.toggle('toggle');
    // document.getElementById('myModal').classList.toggle('d-block');
}


// When user clicks anywhere outside of the sidebar, close sidebar
window.onclick = function (event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('side-bar').classList.remove("active-mobile-side")
        document.getElementById('burger').classList.remove('toggle')
        document.getElementById('myModal').classList.remove('d-block')
        changeZPositionOfBackgroundContainerlow()

        document.getElementById('select-employees-container').classList.add('d-none')
        document.getElementById('show-user-details-container').classList.add('d-none')

        if (!document.getElementById('show-board-details-container').classList.contains('d-none')) {
            document.getElementById('show-board-details-container').classList.add('d-none')
            setChangeModeOfBoardTaskDetailsContainerBack('');
        }
        if (!document.getElementById('show-backlog-details-container').classList.contains('d-none')) {
            document.getElementById('show-backlog-details-container').classList.add('d-none')
            setChangeModeOfBacklogTaskDetailsContainerBack('');
        }
    }
}


window.addEventListener('resize', _e => {
    if (window.innerWidth > 700) {
        document.getElementById('side-bar').classList.remove("active-mobile-side")
        document.getElementById('burger').classList.remove('toggle')
        document.getElementById('myModal').classList.remove('d-block')
    }
})

function changeIconColorHover() {
    document.getElementById('header-desktop-help').src = 'img/logos/help-btn-hover.svg'
}

function changeIconColorNoHover() {
    document.getElementById('header-desktop-help').src = 'img/logos/help-btn.svg'
}

function changeIconColorHoverLogout() {
    document.getElementById('logout-btn').src = 'img/logos/logout-join-hover.png'
}

function changeIconColorNoHoverLogout() {
    document.getElementById('logout-btn').src = 'img/logos/logout-join.png'
}

