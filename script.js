


//Wir brauchen für den Bereich "user" bei Add Task  ein Array mit allen Teilnehmern, die Zugang zu der Liste haben. Überschneidung mit Login
let users = [
    {
        "id": 0,
        "name": 'Martin',
        "password": '*****',
        "icon": "./img/001_fb copy.jpg"
    },

    {
        "id": 1,
        "name": 'Stefan',
        "password": '*****',
        "icon": "./img/001_fb copy.jpg"
    },

    {
        "id": 2,
        "name": 'Julia',
        "password": '*****',
        "icon": "./img/001_fb copy.jpg"
    },

    {
        "id": 3,
        "name": 'Michael',
        "password": '*****',
        "icon": "./img/github.jpg"
    },

    {
        "id": 4,
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

// init function for body-onloading to load more functions as one!
function init() {
    loadUsers()
}


// Login function
function submitNewUser() {
    let newUser = document.getElementById('new-user-inputfield-login')
    let newUserPassword = document.getElementById('new-user-inputfield-pw')
    let userId = users.length;

    if (checkIfUserNameAlreadyExist(newUser) == true) {
        alert('Usersname already exist')
    }
    else {
        let user = {
            "id": userId,
            "name": newUser.value,
            "password": newUserPassword.value,
            "icon": ''
        };

        users.push(user);
        newUser.value = '';
        newUserPassword.value = '';
        loadUsers();
        closeRegisterBox();
    }
}


function checkLoginParaneters() {
    let usersLoginName = document.getElementById('login-user-inputfield')
    let usersLoginPW = document.getElementById('login-user-inputfield-pw')
    let userName = usersLoginName.value

    if (checkIfLoginParameterExist(usersLoginName, usersLoginPW)) {
        hideLoginInputfields();
        showLogoutButton();
        clearLoginInputfields();
        showUsersImage(userName);
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


function checkIfUserNameAlreadyExist(newUser) {
    return users.some(user => user.name === newUser.value);
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
    deleteUsersImageAfterLogout();
}


function showUsersImage(usersLoginName) {
    let content = document.getElementById('user')
    let searchObject = users.find((user) => user.name == usersLoginName); //find object in array according user login name
    let imageSource = searchObject.icon //get the image source of the users image

    content.innerHTML = `
    <img src="${imageSource}">
    `
}


function deleteUsersImageAfterLogout() {
    let content = document.getElementById('user');
    content.innerHTML = '';
}

function openRegisterBox() {
    let content = document.getElementById('register-box')
    content.innerHTML = 
    `<input id="new-user-inputfield-login" type="text" placeholder="name">
    <input id="new-user-inputfield-pw" type="text" placeholder="password">
    <input type="text" placeholder="Repeat password" id="new-user-inputfield-pw-repeat">
    <button onclick="openWindowIconSelection()">Icons</button>
    <div>
        <button onclick="checkPasswortInRegestrationProcess()">Submit</button>
        <button onclick="closeRegisterBox()">Cancel</button>
        </div>
    `
}


function checkPasswortInRegestrationProcess() {
    let password = document.getElementById('new-user-inputfield-pw').value
    let passwortRepeat = document.getElementById('new-user-inputfield-pw-repeat').value

    if (password == passwortRepeat) {
        submitNewUser()
    }
    else {
        alert('please check your password')
    }
}


function closeRegisterBox() {
    let content = document.getElementById('register-box')
    content.innerHTML = '';
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