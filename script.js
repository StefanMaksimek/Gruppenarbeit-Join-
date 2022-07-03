


//Wir brauchen für den Bereich "user" bei Add Task  ein Array mit allen Teilnehmern, die Zugang zu der Liste haben. Überschneidung mit Login
let users = [
    {
        "name": 'Martin',
        "password": '*****',
        "icon": "./img/001_fb copy.jpg"
    },

    {
        "name": 'Stefan',
        "password": '*****',
        "icon": "./img/001_fb copy.jpg"
    },

    {
        "name": 'Julia',
        "password": '*****',
        "icon": "./img/001_fb copy.jpg"
    },

    {
        "name": 'Michael',
        "password": '*****',
        "icon": "./img/github.jpg"
    },

    {
        "name": 'Sahra',
        "password": '*****',
        "icon": "./img/001_fb copy.jpg"
    }
]

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
]

//the current user will be chosen by login
let currentUser;



// Login function


function submitNewUser() {
    let newUser = document.getElementById('new-user-inputfield-login')
    let newUserPassword = document.getElementById('new-user-inputfield-pw')

    //if function necessary which proof, if there already exist a user with the same name
    let user = {
        "name": newUser.value,
        "password": newUserPassword.value
    };

    users.push(user);
    newUser.value = '';
    newUserPassword.value = '';
    loadUsers();
}

function checkLoginParaneters() {
    let usersLoginName = document.getElementById('login-user-inputfield')
    let usersLoginPW = document.getElementById('login-user-inputfield-pw')

    if (checkIfLoginParameterExist(usersLoginName, usersLoginPW)) {
        hideLoginInputfields();
        showLogoutButton();
        clearLoginInputfields();
    } else {
        alert("There is no user with this name or wrong password");
        clearLoginInputfields();
    }
}


function clearLoginInputfields() {
    document.getElementById('login-user-inputfield-pw').value = '';
    document.getElementById('login-user-inputfield').value = '';
}


function hideLoginInputfields() {
    let content = document.getElementById('login-container');
    content.classList.add('d-none')
}


function checkIfLoginParameterExist(usersLoginName, usersLoginPW) {
    return users.some(user => user.name === usersLoginName.value && user.password === usersLoginPW.value);
}


function showLogoutButton() {
    let logoutButton = document.getElementById('logout-button');
    logoutButton.classList.remove('d-none')
}

function hideLogoutButton() {
    let logoutButton = document.getElementById('logout-button');
    logoutButton.classList.add('d-none')
}


function showLoginArea() {
    let loginArea = document.getElementById('login-container');
    loginArea.classList.remove('d-none')
}


function executeLogout() {
    hideLogoutButton();
    showLoginArea();
}

function loadUsersPictures(){
    let content = document.getElementById('user')
    for (let i = 0; i < users.length; i++) {
        const imageSource = users[i].icon;
        content.innerHTML += `
        <img id="users-image-${i}" src="${imageSource}" class="d-none">
        `
    }
}


/** Choice of user */
function loadUsers() {

    let userOptions = document.getElementById('all-users');
    let taskUsers = document.getElementById('task-user');
    userOptions.innerHTML = '';
    taskUsers.innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        const userName = users[i].name;
        userOptions.innerHTML += `<option value="${userName}" onclick="setUser(${userName})"></option>`;
        taskUsers.innerHTML += `<option value="${userName}" onclick="setUser(${userName})"></option>`;
    }
}

function setUser(name) {
    currentUser = `${name}`;
}

function createTask() {

    let title = document.getElementById('title-task');
    let priority = document.getElementById('priority-state-input');
    let category = document.getElementById('category-list-input');
    let user = document.getElementById('task-user-input');
    let status = document.getElementById('status-list-input');
    let description = document.getElementById('task-description');

    let task = {
        "title": title.value,
        "priority": priority.value,
        "category": category.value,
        "due-date": '',
        "user": user.value,
        "status": status.value,
        "description": description.value
    }

    tasks.push(task)

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
    document.getElementById('add-task').className = 'd-none'
    document.getElementById('board-h3').className = ''
    document.getElementById('backlog-h3').className = ''
    document.getElementById('add-task-h3').className = ''
    document.getElementById('help-h3').className = ''
    document.getElementById('impressum-h3').className = ''
    document.getElementById('datenschutz-h3').className = ''
}