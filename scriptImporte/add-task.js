let tasks = [
    {
        "title": 'Design of Concept',
        "priority": 'high',
        "category": 'IT',
        "due-date": '',
        "user": ['Martin', 'Sahra', 'Stefan'],
        "status": 'ToDo',
        "description": 'create some ideas how we can resolve the problem of the responsible design and the arrangement of the object of the side'
    }
];

let temporaryArrayColor = ['lightblue'];
let temporaryArrayResponsibleEmployees = [];


function showColor() {
    let content = document.getElementById('color-picker')

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


function createTask() {

    let title = document.getElementById('title-task');
    let priority = document.getElementById('priority-state-input');
    let category = document.getElementById('category-list-input');
    let status = document.getElementById('status-list-input');
    let description = document.getElementById('task-description');
    let dueDate = document.getElementById('due-date')
    let color = temporaryArrayColor[0]

    let task = {
        "title": title.value,
        "priority": priority.value,
        "category": category.value,
        "due-date": dueDate.value,
        "user": [],
        "status": status.value,
        "description": description.value,
        "color": color
    }
    pushAllUsersInTask(task)
    tasks.push(task)
    clearTaskInputfields()
}

function pushAllUsersInTask(task) {
    for (let i = 0; i < temporaryArrayResponsibleEmployees.length; i++) {
        const name = temporaryArrayResponsibleEmployees[i];
        task.user.push(name)
    }
}

function lengthOfTitle() {
    return document.getElementById('title-task').value.length;
}


function clearTaskInputfields() {
    document.getElementById('title-task').value = '';
    document.getElementById('priority-state-input').value = 'Priority...';
    document.getElementById('category-list-input').value = 'Category...';
    document.getElementById('status-list-input').value = 'Status...';
    document.getElementById('task-description').value = '...';
    document.getElementById('due-date').value = '';
    clearResponsibleEditorList();
    setTemporaryArrayColorToStandard();
    setTemporaryArrayResponsibleEmployeesToStandard();
    clearColorofButtonForColorSelection()
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
}


function clearUserListForAddEmployees() {
    let content = document.getElementById('search')
    content.value = ''
}

//Search Function

const search = document.getElementById('search')
const matchList = document.getElementById('add-task-editor-list')

let userNames = [];

function loadAllUserNamesInArray() {
    for (let i = 0; i < users.length; i++) {
        const name = users[i].name;
        userNames.push(name)
    }
}

function startSearchUser() {
    let searchText = document.getElementById('search').value;
    searchUser(searchText)
}

function searchUser(searchText) {
    const editors = userNames
    let matches = editors.filter(editor => {
        const regex = new RegExp(`^${searchText}`, "gi")
        return editor.match(regex)
    })

    if (document.getElementById('search').value == '') {
        matches = '';
        document.getElementById('add-task-editor-list').innerHTML = '';
    }

    showMatches(matches)
}

function showMatches(matches) {
    if (matches.length > 0) {
        let userProposals = document.getElementById('add-task-editor-list')
        document.getElementById('add-task-editor-list').innerHTML = '';
        for (let i = 0; i < matches.length; i++) {
            let user = matches[i];
            let icon = users.find(t => t.name == user).icon

            if (alreadyResponsibleUserAdded(user)) { //if user is already in the editor list, it has not to be shown as possible editor
            }
            else {
                userProposals.innerHTML += `
            <div class="list-search-result" id="${user}-${icon}">
            <img src="${icon}" onclick="addUserToResponsibleEmployees('${user}', '${icon}')">
                <p id="responsible-employees-${user}"  onclick="addUserToResponsibleEmployees('${user}', '${icon}')">${user}</p>
            </div>`
            }

        }
    }

    matches = [];
}

function alreadyResponsibleUserAdded(user) {
    return document.getElementById('responsible-editor-list').contains(document.getElementById(`${user}-responsible-editor-img`))
}

function addUserToResponsibleEmployees(user, icon) {
    let responsibleUser = {
        "user": user,
        "icon": icon
    }
    temporaryArrayResponsibleEmployees.push(responsibleUser)
    renderResponsibleUserList()
    deleteFromList(user, icon);
}

function renderResponsibleUserList() {
    let content = document.getElementById('responsible-editor-list')
    content.innerHTML = '';

    for (let i = 0; i < temporaryArrayResponsibleEmployees.length; i++) {
        const name = temporaryArrayResponsibleEmployees[i].user;
        const img = temporaryArrayResponsibleEmployees[i].icon;
        content.innerHTML += ` 
        <img id="${name}-responsible-editor-img" draggable="true" ondragstart="deleteResponsibleEmployee('${name}', '${img}')" class="list-search-result-img" src="${img}">`
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

function allowDrop(ev) {
    ev.preventDefault();
}

function highlight() {
    document.getElementById('responsible-editor-list-bin').classList.add('drag-area-highlight')
}


//delete by moving the img to the bin
function moveToBin() {
    const index = temporaryArrayResponsibleEmployees.findIndex(x => x.user === currentDraggedUserAddTask);
if (index !== undefined) temporaryArrayResponsibleEmployees.splice(index, 1);

    //temporaryArrayResponsibleEmployees.splice(currentDraggedUserAddTask, 1)
    renderResponsibleUserList()
}