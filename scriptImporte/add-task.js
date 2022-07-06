let tasks = [
    {
        "title": 'Design of Concept',
        "priority": 'high',
        "category": 'IT',
        "due-date": '',
        "user": 'Martin',
        "status": 'ToDo',
        "description": 'create some ideas how we can resolve the problem of the responsible design and the arrangement of the object of the side'
    }
];

let temporaryArrayColor = ['lightblue'];


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
    let user = document.getElementById('task-user-input');
    let status = document.getElementById('status-list-input');
    let description = document.getElementById('task-description');
    let dueDate = document.getElementById('due-date')
    let color = temporaryArrayColor[0]

    let task = {
        "title": title.value,
        "priority": priority.value,
        "category": category.value,
        "due-date": dueDate.value,
        "user": user.value,
        "status": status.value,
        "description": description.value,
        "color": color
    }
    checkInputValueOfAddTask(task)
}


function checkInputValueOfAddTask(task) {
    if (lengthOfTitle() < 1) {
        alert('please write some title')
    }
    else {
        tasks.push(task)
        clearTaskInputfields()
    }
}


function lengthOfTitle() {
    return document.getElementById('title-task').value.length;
}


function clearTaskInputfields() {
    document.getElementById('title-task').value = '';
    document.getElementById('priority-state-input').value = 'Priority...';
    document.getElementById('category-list-input').value = 'Category...';
    document.getElementById('task-user-input').value = '';
    document.getElementById('status-list-input').value = 'Status...';
    document.getElementById('task-description').value = '...';
    document.getElementById('due-date').value = '';
    setTemporaryArrayColorToStandard();
    clearColorofButtonForColorSelection()
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
    //loadUserListForAddEmployees()
}

/*
function loadUserListForAddEmployees() {
    let content = document.getElementById('add-task-editor-list')
    for (let i = 0; i < users.length; i++) {
        const userName = users[i].name;
        const userIcon = users[i].icon;

        content.innerHTML += `<div class="add-task-select-employees">
        <img src="${userIcon}">
        <span>${userName}</span>
        </div>`
    }
}

function clearUserListForAddEmployees() {
    let content = document.getElementById('add-task-editor-list')
    content.innerHTML = ''
}*/

//Search Function

const search = document.getElementById('search')
const matchList = document.getElementById('add-task-editor-list')

let userNames = [];

function loadAllUserNamesInArray(){
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
            userProposals.innerHTML += `
            <div class="list-search-result" id="pokemon-match-${i}" onclick="addUserToResponsibleEmployees('${user}')">
                ${user}
            </div>`
        }
    }

    matches = [];
}