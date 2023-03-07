let temporaryArrayColor = ['lightblue'];
let temporaryArrayResponsibleEmployees = [];
let statusTask = 'toDo'; //toDo, inProgress, testing, done
let locationTask = 'board'; // backlog or board


function changeStatusTaskAndLocation(status, location) {
    statusTask = status;
    locationTask = location
    setTemporaryArrayResponsibleEmployeesToStandard() //if someone choose a user in add task card it will also appear in board card after one user added as responsible for task
    setTextInHeaderOfSideBarTask(status);
}


function setTextInHeaderOfSideBarTask(status) {
    let content = document.getElementById('side-bar-task-status')
    if (status == 'to-do') {
        content.innerHTML = 'TO DO'
    }
    if (status == 'in-progress') {
        content.innerHTML = 'IN PROGRESS'
    }
    if (status == 'testing') {
        content.innerHTML = 'TESTING'
    }
    if (status == 'done') {
        content.innerHTML = 'DONE'
    }
}

// ###### Color Options Start ######
function showColor() {
    let content = document.getElementById('color-picker')
    content.innerHTML = '';
    colorPicker.forEach(color => {
        content.innerHTML += colorPickerHTML(color)
    });

    if (colorOptionsAreHiding(content)) {
        content.classList.remove('d-none')
    }
    else {
        content.classList.add('d-none')
    }
}

function showColorChangeBoard() {
    let content = document.getElementById('color-picker-change-board')
    content.innerHTML = '';
    colorPicker.forEach(color => {
        content.innerHTML += colorPickerHTML(color)
    });

    if (colorOptionsAreHiding(content)) {
        content.classList.remove('d-none')
    }
    else {
        content.classList.add('d-none')
    }
}


function colorOptionsAreHiding(content) {
    return content.classList.contains('d-none');
}


function changeButtonColorOfColorPicker(color) {
    let button = document.getElementById('add-task-color-button')
    button.style = (`background-color: ${color}`)
}


function takeColor(color) {
    temporaryArrayColor.length = 0; // clear temporaryArray
    temporaryArrayColor.push(color);
    showColor();
    changeButtonColorOfColorPicker(color)
}

// ###### Color Options End ######

function createTask() {
    if (taskIsWritteninAddTaskArea()) {
        createTaskFromAddTask()
    }
    else {
        createTaskFromBoard()
    }
}


function taskIsWritteninAddTaskArea() {
    return !document.getElementById('add-task').classList.contains('d-none');
}


function createTaskFromBoard() {
    let title = document.getElementById('title-task-sidebar');
    let priority = document.getElementById('priority-state-input-sidebar');
    let category = document.getElementById('category-list-input-sidebar');
    let description = document.getElementById('task-description-sidebar');
    let color = temporaryArrayColor[0]
    let id = tasks.length
    let dueDate = document.getElementById('due-date-sidebar')
    createObjTask(title, priority, category, description, color, id, dueDate)
}


function createTaskFromAddTask() {
    let title = document.getElementById('title-task');
    let priority = document.getElementById('priority-state-input');
    let category = document.getElementById('category-list-input');
    let description = document.getElementById('task-description');
    let color = temporaryArrayColor[0]
    let id = createRandomId();
    let dueDate = document.getElementById('due-date')    
    createObjTask(title, priority, category, description, color, id, dueDate)
}


function createRandomId() {
    let textId = Math.round(new Date().getTime() / 1000);
    let idAdd = Math.random().toString(16).substr(2, 6);
    let id = textId + idAdd
    return id
}


function createObjTask(title, priority, category, description, color, id, dueDate) {
    let taskInfo = createJsonForTask(title, priority, category, description, color, id, dueDate);
    let task = new Task(taskInfo);

    pushAllUsersInTask(task);
    tasks.push(task);
    uploadTasks();
    clearAddTask();
    renderBoard();
    if (locationTask == 'backlog') {
        renderBacklog()
        openBacklog()
    }
    else {
        pushTask(id, statusTask);
    }
}

function createJsonForTask(title, priority, category, description, color, id, dueDate) {
    let taskInfo = {
        "id": id,
        "title": title.value,
        "priority": priority.value,
        "category": category.value,
        "createdAt": new Date().getTime(),
        "dueDate": new Date(dueDate.value).getTime(),
        "user": [],
        "status": '',
        "description": description.value,
        "color": color,
        "locationTask": locationTask //where the task is rendered
    }
    return taskInfo;
}


function pushAllUsersInTask(task) {
    for (let i = 0; i < temporaryArrayResponsibleEmployees.length; i++) {
        const nameResponsibleUserObj = temporaryArrayResponsibleEmployees[i];
        task.user.push(nameResponsibleUserObj)
    }
}


function lengthOfTitle() {
    return document.getElementById('title-task').value.length;
}


function clearAddTask() {
    clearTaskInputfields();
    clearResponsibleEditorList();
    setTemporaryArrayColorToStandard();
    setTemporaryArrayResponsibleEmployeesToStandard();
    clearColorofButtonForColorSelection()
}


function clearTaskInputfields() {
    document.getElementById('title-task').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('due-date').value = '';
}


function clearResponsibleEditorList() {
    document.getElementById('responsible-editor-list').innerHTML = '';
    document.getElementById('responsible-editor-list-board').innerHTML = '';
}


function setTemporaryArrayResponsibleEmployeesToStandard() {
    temporaryArrayResponsibleEmployees.length = 0;
}


function setTemporaryArrayColorToStandard() {
    let color = 'lightblue'; // if no color is selected, lightblue wil be pushed
    temporaryArrayColor[0] = color;
}


function clearColorofButtonForColorSelection() {
    document.getElementById('add-task-color-button').style.backgroundColor = null;
}


function closeListOfEmployeesBoxForAddTask() {
    document.getElementById('select-employees-container').classList.add('d-none')
    if (currentlyNotInChangeModeOffTaskDetailViewInBoardArea() && currentlyNotInChangeModeOffTaskDetailViewInBacklogArea()) {
        document.getElementById('myModal').classList.remove('d-block')
    }
    changeZPositionOfBackgroundContainerlow()
    clearUserListForAddEmployees()
}


function currentlyNotInChangeModeOffTaskDetailViewInBoardArea() {
    return document.getElementById('show-board-details-container').classList.contains('d-none')
}


function currentlyNotInChangeModeOffTaskDetailViewInBacklogArea() {
    return document.getElementById('show-backlog-details-container').classList.contains('d-none')
}


function openListOfEmployeesBoxForAddTask() {
    showTwentyUsersAsProbosalsInSearchfield();
    changeZPositionOfBackgroundContainerHigh();

    document.getElementById('myModal').classList.add('d-block')
    document.getElementById('select-employees-container').classList.remove('d-none');
}


function changeZPositionOfBackgroundContainerHigh() {
    document.getElementById('myModal').style = 'z-index: 99;'
}


function changeZPositionOfBackgroundContainerlow() {
    document.getElementById('myModal').style = 'z-index: 49;'
}


function clearUserListForAddEmployees() {
    let contentName = document.getElementById('search-name')
    contentName.value = ''

    let contentMail = document.getElementById('search-mail')
    contentMail.value = ''
}

//Search Function

const search = document.getElementById('search-name')
const matchList = document.getElementById('add-task-editor-list')

function showSearchInputfield(visible, hide) {
    let contentToShow = document.getElementById(`show-search-${visible}-inputfield`)
    contentToShow.classList.remove('d-none') //if show search Mail is clicked, show clickable text search Name appear

    let contentToHide = document.getElementById(`show-search-${hide}-inputfield`)
    contentToHide.classList.add('d-none') // and clickable text search mail disappear

    let inputfieldToHide = document.getElementById(`search-${visible}`)
    let inputfieldToShow = document.getElementById(`search-${hide}`)

    inputfieldToHide.classList.add('d-none')
    inputfieldToShow.classList.remove('d-none')
    clearHidedInputfield(visible)
}


function clearHidedInputfield(show) {
    let inputfieldShow = document.getElementById(`search-${show}`)
    inputfieldShow.value = ''
}


function startSearchUser() {
    let searchText = document.getElementById('search-name').value;
    searchUserName(searchText);
}


function startSearchMail() {
    let searchText = document.getElementById('search-mail').value;
    searchUserMail(searchText);
}

let searchMatches;
let searchMatchesMails = [];
let mails = [];


function searchUserMail(searchText) {

    fillTheArrayOfAllUserMailAdresses()
    searchMatchesMails = mails.filter(editor => {
        const regex = new RegExp(`^${searchText}`, "gi")
        return editor.match(regex)
    })

    if (document.getElementById('search-mail').value == '') {
        searchMatchesMails = '';
        document.getElementById('add-task-editor-list').innerHTML = '';
    }

    showSearchMatchesMail()
}


function fillTheArrayOfAllUserMailAdresses() {
    let allUsersMails = users.filter(t => t.mail != '')
    mails = allUsersMails.map(function (element) {
        return `${element.mail}`
    })
}




function showSearchMatchesMail() {
    if (searchMatchesMails.length > 0) {
        let userProposals = document.getElementById('add-task-editor-list')
        document.getElementById('add-task-editor-list').innerHTML = ''; //clear visible list of users

        searchMatchesMails.forEach(mailAddress => {
            getAllUserOfTheSearchByMail(mailAddress, userProposals)
        })

        searchMatches = [];
    }
}


function getAllUserOfTheSearchByMail(mailAddress, userProposals) {
    let userObj = users.find(u => u.mail == mailAddress)
    let icon = userObj.icon
    let user = userObj.name
    if (!alreadyResponsibleUserAdded(user) || !alreadyResponsibleUserAddedChangeTaskBoard(user)) { //if user is already in the editor list, it has not to be shown as possible editor
        userProposals.innerHTML += renderSearchedEmployeesHTML(user, icon);
    }
}


function searchUserName(searchText) {
    const editors = userNames
    searchMatches = editors.filter(editor => {
        const regex = new RegExp(`^${searchText}`, "gi")
        return editor.match(regex)
    })

    if (document.getElementById('search-name').value == '') {
        searchMatches = '';
        document.getElementById('add-task-editor-list').innerHTML = '';
    }

    showSearchMatches()
}


function showTwentyUsersAsProbosalsInSearchfield() {
    let userProposals = document.getElementById('add-task-editor-list')

    userProposals.innerHTML = ``
    if (noUserHasBeenSearched()) {
        if (notMoreUserObjectsThanTwenty()) {
            renderUsersAsProposals(userProposals)
        }
        else {
            renderFirstTwentyUsersAsProposals(userProposals)
        }
    }
}


function renderUsersAsProposals(userProposals) {
    for (let i = 0; i < users.length; i++) {
        let user = users[i].name;
        let icon = users[i].icon

        if (alreadyResponsibleUserAdded(user) || alreadyResponsibleUserAddedChangeTaskBoard(user) || alreadyResponsibleUserAddedChangeTaskBacklog(user)) { //if user is already in the editor list, it has not to be shown as possible editor
        }
        else {
            userProposals.innerHTML += renderSearchedEmployeesHTML(user, icon);
        }
    }
}


function renderFirstTwentyUsersAsProposals(userProposals) {
    for (let i = 0; i < 20; i++) {
        let user = users[i].name;
        let icon = users[i].icon

        if (alreadyResponsibleUserAdded(user) || alreadyResponsibleUserAddedChangeTaskBoard(user) || alreadyResponsibleUserAddedChangeTaskBacklog(user)) { //if user is already in the editor list, it has not to be shown as possible editor
        }
        else {
            userProposals.innerHTML += renderSearchedEmployeesHTML(user, icon);
        }
    }
}


function noUserHasBeenSearched() {
    return document.getElementById('search-name').value == '' && document.getElementById('search-mail').value == '';
}


function notMoreUserObjectsThanTwenty() {
    return users.length < 20;
}


function showSearchMatches() {
    if (searchMatches.length > 0) {
        let userProposals = document.getElementById('add-task-editor-list')
        document.getElementById('add-task-editor-list').innerHTML = '';
        for (let i = 0; i < searchMatches.length; i++) {
            let user = searchMatches[i];
            let userObj = users.find(t => t.name == user)
            let icon = userObj.icon

            if (!alreadyResponsibleUserAdded(user) || !alreadyResponsibleUserAddedChangeTaskBoard(user) || !alreadyResponsibleUserAddedChangeTaskBacklog(user)) { //if user is already in the editor list, it has not to be shown as possible editor
                userProposals.innerHTML += renderSearchedEmployeesHTML(user, icon);
            }
        }
    }
    searchMatches = [];
}


function alreadyResponsibleUserAdded(user) {
    return document.getElementById('responsible-editor-list').contains(document.getElementById(`${user}-responsible-editor-img`))
}


function alreadyResponsibleUserAddedChangeTaskBoard(user) {
    return document.getElementById('responsible-editor-list-change-task-board').contains(document.getElementById(`${user}-responsible-editor-img`))
}


function alreadyResponsibleUserAddedChangeTaskBacklog(user) {
    return document.getElementById('responsible-editor-list-change-task-backlog').contains(document.getElementById(`${user}-responsible-editor-img`))
}


function addUserToResponsibleEmployees(user, icon) {
    let userObj = users.find(t => t.name == user)
    temporaryArrayResponsibleEmployees.push(userObj)
    renderResponsibleUserList()
    deleteFromSearchListByClickOnIcon(user, icon);
}


function renderResponsibleUserList() {
    let content;
    if (locationTask == 'board' && changeInDetailViewOnBoardIsHidden()) {
        content = document.getElementById('responsible-editor-list-board')
    }
    if (locationTask == 'board' && !changeInDetailViewOnBoardIsHidden()) {
        content = document.getElementById('responsible-editor-list-change-task-board')
    }
    if (locationTask == 'backlog' && changeInDetailViewOnBacklogIsHidden()) {
        content = document.getElementById('responsible-editor-list')
    }
    if (locationTask == 'backlog' && !changeInDetailViewOnBacklogIsHidden()) {
        content = document.getElementById('responsible-editor-list-change-task-backlog')
    }

    content.innerHTML = '';

    for (let i = 0; i < temporaryArrayResponsibleEmployees.length; i++) {
        const name = temporaryArrayResponsibleEmployees[i].name;
        const img = temporaryArrayResponsibleEmployees[i].icon;
        const mail = temporaryArrayResponsibleEmployees[i].mail;
        content.innerHTML += renderSelectedEmployeesHTML(name, img, mail);
    }
}


function changeInDetailViewOnBoardIsHidden() {
    return document.getElementById('show-board-details-box-icon-change-detail-box').classList.contains('d-none')
}


function changeInDetailViewOnBacklogIsHidden() {
    return document.getElementById('show-backlog-details-box-icon-change').classList.contains('d-none')
}


function deleteFromSearchListByClickOnIcon(user, icon) {
    let content = document.getElementById(`${user}-${icon}`)
    content.parentNode.removeChild(content)
}


let currentDraggedUserAddTask;
let currentDraggedIconAddTask;


function getResponsibleEmployeeForDelete(mail, icon) {
    currentDraggedUserAddTask = mail;
    currentDraggedIconAddTask = icon
}


//delete by moving the img to the bin
function moveToBin() {
    const index = temporaryArrayResponsibleEmployees.findIndex(x => x.mail === currentDraggedUserAddTask);
    if (index !== undefined) temporaryArrayResponsibleEmployees.splice(index, 1);

    renderResponsibleUserList()
}


function showHintForBinAddTask() {
    document.getElementById('bin-hint-task-one').classList.remove('d-none')
    document.getElementById('bin-hint-task-two').classList.remove('d-none')
    document.getElementById('bin-hint-task-three').classList.remove('d-none')
}


function hideHintForBinAddTask() {
    document.getElementById('bin-hint-task-one').classList.add('d-none')
    document.getElementById('bin-hint-task-two').classList.add('d-none')
    document.getElementById('bin-hint-task-three').classList.add('d-none')
}


function loadAlreadyAssignedUserInTemporaryArray(currentTask) {
    for (let i = 0; i < currentTask.user.length; i++) {
        const user = currentTask.user[i];
        temporaryArrayResponsibleEmployees.push(user)
    }
}