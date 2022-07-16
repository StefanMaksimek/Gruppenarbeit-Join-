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
    let dueDate = document.getElementById('due-date')
    let color = temporaryArrayColor[0]
    let id = tasks.length

    createObjTask(title, priority, category, status, description, dueDate, color, id)
}


function createObjTask(title, priority, category, status, description, dueDate, color, id){
    let task = {
        "id": id,
        "title": title.value,
        "priority": priority.value,
        "category": category.value,
        "createdAt": new Date().getTime(),
        "dueDate": new Date().getTime(dueDate.value),
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
    let content = document.getElementById('list-of-employees-box')
    content.classList.add('d-none')
    clearUserListForAddEmployees()
}


function openListOfEmployeesBoxForAddTask() {
    let content = document.getElementById('list-of-employees-box');
    content.classList.remove('d-none');
    showTwentyUsersAsProbosals();
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

function showSearchInputfield(show, hide){
    let contentShow = document.getElementById(`show-search-${show}-inputfield`)
    contentShow.classList.remove('d-none') //if show search Mail is clicked, show clickable text search Name appear

    let contentHide = document.getElementById(`show-search-${hide}-inputfield`)
    contentHide.classList.add('d-none') // and clickable text search mail disappear

    let inputfieldShow = document.getElementById(`search-${show}`)
    let inputfieldHide = document.getElementById(`search-${hide}`)

    inputfieldShow.classList.add('d-none')
    inputfieldHide.classList.remove('d-none')
    clearHidedInputfield(show)
}


function clearHidedInputfield(show){
    let inputfieldShow = document.getElementById(`search-${show}`)
    inputfieldShow.value = ''
}


function startSearchUser() {
    let searchText = document.getElementById('search-name').value;
    searchUserName(searchText);
}

function startSearchMail(){
    let searchText = document.getElementById('search-mail').value;
    searchUserMail(searchText);
}

let searchMatches;
let searchMatchesMails = [];

function searchUserMail(searchText) {
    let allUsersMails = users.filter(t => t.mail != '')
    let mails = allUsersMails.map(function(element){
        return `${element.mail}`
    })
    
    
    searchMatchesMails = mails.filter(editor => {
        const regex = new RegExp(`^${searchText}`, "gi")
        return editor.match(regex)
    })

    if (document.getElementById('search-mail').value == '') {
        searchMatches = '';
        document.getElementById('add-task-editor-list').innerHTML = '';
    }

    showMatchesMail()
}




function showMatchesMail() {
    if (searchMatchesMails.length > 0) {
        let userProposals = document.getElementById('add-task-editor-list')
        document.getElementById('add-task-editor-list').innerHTML = '';
        for (let i = 0; i < searchMatchesMails.length; i++) {
            let mail = searchMatchesMails[i];
            let userObj = users.find(t => t.mail == mail)
            let icon = userObj.icon
            let user = userObj.name

            if (!alreadyResponsibleUserAdded(user)) { //if user is already in the editor list, it has not to be shown as possible editor
                userProposals.innerHTML += renderSearchedEmployeesHTML(user, icon);
            }
        }
    }
    searchMatches = [];
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

    showMatches()
}


function showTwentyUsersAsProbosals() {
    let userProposals = document.getElementById('add-task-editor-list')
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


function showMatches() {
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
    deleteFromList(user, icon);
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


/**content.innerHTML += `<div id="${name}-responsible-editor-box" draggable="true" ondragstart="deleteResponsibleEmployee(${name})"> 
        <img id="${name}-responsible-editor-img" class="list-search-result-img" src="${img}"></div>` */

function deleteFromList(user, icon) {
    let content = document.getElementById(`${user}-${icon}`)
    content.parentNode.removeChild(content)
}


let currentDraggedUserAddTask;
let currentDraggedIconAddTask;


function deleteResponsibleEmployee(user, icon) {
    currentDraggedUserAddTask = user;
    currentDraggedIconAddTask = icon
}
/**/

//delete by moving the img to the bin
function moveToBin() {
    const index = temporaryArrayResponsibleEmployees.findIndex(x => x.name === currentDraggedUserAddTask);
    if (index !== undefined) temporaryArrayResponsibleEmployees.splice(index, 1);

    //temporaryArrayResponsibleEmployees.splice(currentDraggedUserAddTask, 1)
    renderResponsibleUserList()
}


function showUserDetails(user) {
    let userObj = users.find(t => t.name == user);
    let icon = userObj.icon;
    let mail = userObj.mail;
    let tel = userObj.phone;
    let category = userObj.category;
    let city = userObj.city;
    let hobby = userObj.Hobbys;

    let content = document.getElementById('show-user-details-container');
    content.classList.remove('d-none')

    fillUserDetails(user, icon, mail, tel, category, city, hobby);
}


function fillUserDetails(user, icon, mail, tel, category, city, hobby) {
    fillUserName(user);
    fillUserIcon(icon);
    fillUserMail(mail);
    fillUserPhone(tel);
    fillUserCategory(category);
    fillUserCity(city);
    fillUserHobby(hobby)
}


function fillUserName(name) {
    let userName = document.getElementById('show-user-details-box-name')
    userName.innerHTML = `${name}`
}


function fillUserIcon(icon) {
    let userIcon = document.getElementById('show-user-details-box-icon')
    userIcon.src = `${icon}`
}


function fillUserMail(mail) {
    let userMail = document.getElementById('show-user-details-box-mail')
    userMail.innerHTML = `${mail}`
}


function fillUserPhone(tel) {
    let userTel = document.getElementById('show-user-details-box-tel')
    userTel.innerHTML = `${tel}`
}


function fillUserCategory(category) {
    let userCategory = document.getElementById('show-user-details-box-category')
    userCategory.innerHTML = `${category}`
}


function fillUserCity(city) {
    let userCity = document.getElementById('show-user-details-box-city')
    userCity.innerHTML = `${city}`
}


function fillUserHobby(hobby) {
    let userHobby = document.getElementById('show-user-details-box-hobby')
    userHobby.innerHTML = `${hobby}`
}


function closeUserDetails() {
    let content = document.getElementById('show-user-details-container');
    content.classList.add('d-none');
    clearUserDetails()
}


function clearUserDetails() {
    document.getElementById('show-user-details-box-name').innerHTML = '';
    document.getElementById('show-user-details-box-icon').src = '';
    document.getElementById('show-user-details-box-mail').innerHTML = '';
    document.getElementById('show-user-details-box-tel').innerHTML = '';
    document.getElementById('show-user-details-box-category').innerHTML = '';
    document.getElementById('show-user-details-box-city').innerHTML = '';
    document.getElementById('show-user-details-box-hobby').innerHTML = '';
}


function showHintForBin(){
    
    let content = document.getElementById('add-task-bin-info-box')
    content.classList.remove('d-none')
}


function hideHintForBin(){
    let content = document.getElementById('add-task-bin-info-box')
    content.classList.add('d-none')
}
