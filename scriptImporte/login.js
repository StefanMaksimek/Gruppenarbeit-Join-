//wenn kein Icon ausgewählt wurde, das Unknown Icon einsetzen mit Alert "willst du kein Icon wählen"




//Wir brauchen für den Bereich "user" bei Add Task  ein Array mit allen Teilnehmern, die Zugang zu der Liste haben. Überschneidung mit Login
let users = [
    {
        "id": 0,
        "name": 'Martin',
        "password": '*****',
        "icon": "./img/icon_male_2.png"
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
        "icon": "./img/icon_female_3.jpg"
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
        "icon": "./img/icon_female_6.png"
    }
]

let icons = [
    {
        "id": 0,
        "icon": "./img/icon_female_1.png"
    },
    {
        "id": 1,
        "icon": "./img/icon_female_2.png"
    },
    {
        "id": 2,
        "icon": "./img/icon_female_3.jpg"
    },
    {
        "id": 3,
        "icon": "./img/icon_female_4.jpg"
    },
    {
        "id": 4,
        "icon": "./img/icon_female_5.jpg"
    },
    {
        "id": 5,
        "icon": "./img/icon_female_6.png"
    },
    {
        "id": 6,
        "icon": "./img/icon_female_7.jpg"
    },
    {
        "id": 7,
        "icon": "./img/icon_male_1.png"
    },
    {
        "id": 8,
        "icon": "./img/icon_male_2.png"
    },
    {
        "id": 9,
        "icon": "./img/icon_male_3.png"
    },
    {
        "id": 10,
        "icon": "./img/icon_male_4.png"
    },
    {
        "id": 11,
        "icon": "./img/icon_male_5.jpg"
    },
    {
        "id": 12,
        "icon": "./img/icon_male_6.png"
    },
    {
        "id": 13,
        "icon": "./img/icon-unknown.svg"
    }
]

let temporaryIconArray = [];

//the current user will be chosen by login
let currentUser;

// init function for body-onloading to load more functions as one!
function init() {
    loadUsers()
}


// ####### Login functions #######
function openLoginBox() {
    let content = document.getElementById('login-container')
    content.classList.remove('d-none')
}


function checkLoginParameters() {
    let usersLoginName = document.getElementById('login-user-inputfield')
    let usersLoginPW = document.getElementById('login-user-inputfield-pw')
    let userName = usersLoginName.value

    if (checkIfLoginParameterExist(usersLoginName, usersLoginPW)) {
        showLogout();
        closeLoginBox();
        showUsersImage(userName);
        hideLoginButton();
    } else {
        alert("There is no user with this name or wrong password");
        clearLoginInputfields();
    }
}


function checkIfLoginParameterExist(usersLoginName, usersLoginPW) {
    return users.some(user => user.name === usersLoginName.value && user.password === usersLoginPW.value);
}


function closeLoginBox() {
    hideLoginBox();
    clearLoginInputfields();
}


function hideLoginBox() {
    let content = document.getElementById('login-container');
    content.classList.add('d-none')
}


function clearLoginInputfields() {
    let input1 = document.getElementById('login-user-inputfield');
    let input2 = document.getElementById('login-user-inputfield-pw');
    input1.value = '';
    input2.value = '';
}


// ####### Registration functions #######
function openRegisterBox() {
    let content = document.getElementById('registration-box');
    content.classList.remove('d-none');
    clearLoginInputfields()
}


function closeRegisterBox() {
    let content = document.getElementById('registration-box');
    content.classList.add('d-none');
    clearInputfieldsRegistration();
    clearIconSelection();
}


function checkPasswortInRegestrationProcess() {
    let password = document.getElementById('new-user-inputfield-pw').value;
    let passwortRepeat = document.getElementById('new-user-inputfield-pw-repeat').value;

    if (password == passwortRepeat) {
        submitNewUser()
    }
    else {
        alert('please check your password')
    }
}


function submitNewUser() {
    let newUser = document.getElementById('new-user-inputfield-login');
    let newUserPassword = document.getElementById('new-user-inputfield-pw');
    let iconSource = temporaryIconArray[0];

    if (checkIfUserNameAlreadyExist(newUser) == true) {
        alert('Username already exist or no icon is selected')
    }
    else {
        if (noIconIsSelected()) {
            openWindowAskForConfirmationToUseUnknownImage();
        }
        else {
            pushNewUserInArrayUsers(newUser, newUserPassword, iconSource)
        }
    }
}


function checkIfUserNameAlreadyExist(newUser) {
    return users.some(user => user.name === newUser.value);
}


function pushNewUserInArrayUsers(newUser, newUserPassword, iconSource) {
    let userId = users.length;
    let user = {
        "id": userId,
        "name": newUser.value,
        "password": newUserPassword.value,
        "icon": iconSource
    };
    users.push(user);
    loadUsers();
    closeRegisterBox();
    clearTemporaryIconArray();
    alert('Ready for login')
}


function clearInputfieldsRegistration() {
    let input1 = document.getElementById('new-user-inputfield-login')
    let input2 = document.getElementById('new-user-inputfield-pw')
    let input3 = document.getElementById('new-user-inputfield-pw-repeat')
    input1.value = '';
    input2.value = '';
    input3.value = '';
}


// Registration functions - show password
function showPassword() {
    let x = document.getElementById("new-user-inputfield-pw");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// Registration functions - icons
function openWindowIconSelection() {
    let content = document.getElementById('icon-box')
    content.innerHTML = '';
    for (let i = 0; i < icons.length; i++) {
        const icon = icons[i].icon;
        content.innerHTML += `<img src="${icon}" onclick="saveSelectionOfIcon('${icon}')">`;
    }
}


function saveSelectionOfIcon(icon) {
    temporaryIconArray.length = 0; // clear array, because only the last clicked icon should be pushed
    temporaryIconArray.push(icon);
    closeIconOverview();
    showSelectedIcon(icon);
}


function closeIconOverview() {
    let content = document.getElementById('icon-box');
    content.innerHTML = '';
}


function showSelectedIcon(icon) {
    let content = document.getElementById('icon-box');
    content.innerHTML = `<img src="${icon}">`;
}


function clearIconSelection(){
    let icons = document.getElementById('icon-box');
    icons.innerHTML = '<img src="/img/icon-unknown.svg">';
}


// No Icon selected
function openWindowAskForConfirmationToUseUnknownImage() {
    let content = document.getElementById('registration-request-no-icon-selected-box');
    content.classList.remove('d-none');
}


function closeAskForIconSelection() {
    let content = document.getElementById('registration-request-no-icon-selected-box');
    content.classList.add('d-none');
}


function submitNewUserWithUnknownIcon() {
    let iconSource = './img/icon-unknown.svg';
    let newUser = document.getElementById('new-user-inputfield-login');
    let newUserPassword = document.getElementById('new-user-inputfield-pw');
    closeAskForIconSelection();
    pushNewUserInArrayUsers(newUser, newUserPassword, iconSource);
}


function clearTemporaryIconArray() {
    temporaryIconArray.length = 0
}


function noIconIsSelected() {
    return temporaryIconArray.length == 0
}


//sidebar visibility login, logout, userImage
function hideLoginButton() {
    let content = document.getElementById('login-h3');
    content.classList.add('d-none');
}


function showLogout() {
    let logoutButton = document.getElementById('logout-h3');
    logoutButton.classList.remove('d-none');
}


function hideLogoutButton() {
    let logoutButton = document.getElementById('logout-h3');
    logoutButton.classList.add('d-none');
}


function showLoginButton() {
    let loginArea = document.getElementById('login-h3');
    loginArea.classList.remove('d-none');
}


function showUsersImage(usersLoginName) {
    let content = document.getElementById('user');
    let searchObject = users.find((user) => user.name == usersLoginName); //find object in array according user login name
    let imageSource = searchObject.icon; //get the image source of the users image

    content.innerHTML = `
    <img src="${imageSource}">
    `;
}


// Logout function
function executeLogout() {
    hideLogoutButton();
    showLoginButton();
    deleteUsersImageAfterLogout();
}


function deleteUsersImageAfterLogout() {
    let content = document.getElementById('user');
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