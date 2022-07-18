let temporaryArrayColor = ['lightblue'];
let temporaryArrayResponsibleEmployees = [];

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

    let title = document.getElementById('title-task');
    let priority = document.getElementById('priority-state-input');
    let category = document.getElementById('category-list-input');
    let status = document.getElementById('status-list-input');
    let description = document.getElementById('task-description');
    let color = temporaryArrayColor[0]
    let id = tasks.length
    let dueDate = document.getElementById('due-date')
    createObjTask(title, priority, category, status, description, color, id, dueDate)
}


function createObjTask(title, priority, category, status, description, color, id, dueDate) {

    let task = {
        "id": id,
        "title": title.value,
        "priority": priority.value,
        "category": category.value,
        "createdAt": new Date().getTime(),
        "dueDate": new Date(dueDate.value).getTime(),
        "user": [],
        "status": status.value,
        "description": description.value,
        "color": color,
        "statusTask": "backlog" //proposal for filter attribute for render board. see also loom video 
    }
    pushAllUsersInTask(task);
    tasks.push(task);
    uploadTasks();
    clearAddTask()
    renderBoard()
    renderBacklog()
    openBacklog()
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
    document.getElementById('myModal').classList.remove('d-block')
    clearUserListForAddEmployees()
}


function openListOfEmployeesBoxForAddTask() {
    showTwentyUsersAsProbosalsInSearchfield();

    document.getElementById('myModal').classList.add('d-block')
    document.getElementById('select-employees-container').classList.remove('d-none');
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


function getAllUserOfTheSearchByMail(mailAddress, userProposals){
    let userObj = users.find(u => u.mail == mailAddress)
            let icon = userObj.icon
            let user = userObj.name
            if (!alreadyResponsibleUserAdded(user)) { //if user is already in the editor list, it has not to be shown as possible editor
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

        if (alreadyResponsibleUserAdded(user)) { //if user is already in the editor list, it has not to be shown as possible editor
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

        if (alreadyResponsibleUserAdded(user)) { //if user is already in the editor list, it has not to be shown as possible editor
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

            if (!alreadyResponsibleUserAdded(user)) { //if user is already in the editor list, it has not to be shown as possible editor
                userProposals.innerHTML += renderSearchedEmployeesHTML(user, icon);
            }
        }
    }
    searchMatches = [];
}


function alreadyResponsibleUserAdded(user) {
    return document.getElementById('responsible-editor-list').contains(document.getElementById(`${user}-responsible-editor-img`))
}


function addUserToResponsibleEmployees(user, icon) {
    let userObj = users.find(t => t.name == user)
    temporaryArrayResponsibleEmployees.push(userObj)
    renderResponsibleUserList()
    deleteFromSearchListByClickOnIcon(user, icon);
}


function renderResponsibleUserList() {
    let content = document.getElementById('responsible-editor-list')
    content.innerHTML = '';

    for (let i = 0; i < temporaryArrayResponsibleEmployees.length; i++) {
        const name = temporaryArrayResponsibleEmployees[i].name;
        const img = temporaryArrayResponsibleEmployees[i].icon;
        content.innerHTML += renderSelectedEmployeesHTML(name, img);
    }
}


function deleteFromSearchListByClickOnIcon(user, icon) {
    let content = document.getElementById(`${user}-${icon}`)
    content.parentNode.removeChild(content)
}


let currentDraggedUserAddTask;
let currentDraggedIconAddTask;


function getResponsibleEmployeeForDelete(user, icon) {
    currentDraggedUserAddTask = user;
    currentDraggedIconAddTask = icon
}


//delete by moving the img to the bin
function moveToBin() {
    const index = temporaryArrayResponsibleEmployees.findIndex(x => x.name === currentDraggedUserAddTask);
    if (index !== undefined) temporaryArrayResponsibleEmployees.splice(index, 1);

    renderResponsibleUserList()
}


function showHintForBin() {
    let content = document.getElementById('add-task-bin-info-box')
    content.classList.remove('d-none')
}


function hideHintForBin() {
    let content = document.getElementById('add-task-bin-info-box')
    content.classList.add('d-none')
}
