let currentUser;

let userRegistrationObj;
let temporaryIconArray = [];


// init function for body-onloading to load more functions as one!

let timeInfoShown = 2000;
let timeInfoShownLong = 2500;


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
        showLoginAlertUsernameNotExist();
        setTimeout(hideLoginAlertUsernameNotExist, timeInfoShownLong)
        clearLoginInputfields();
    }
}


function showLoginAlertUsernameNotExist() {
    let alertReadyForLogin = document.getElementById('registration-wrung-username-alert')
    alertReadyForLogin.classList.remove('d-none')
}


function hideLoginAlertUsernameNotExist() {
    let alertReadyForLogin = document.getElementById('registration-wrung-username-alert')
    alertReadyForLogin.classList.add('d-none')
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
    clearTemporaryIconArray();
}


function checkPasswortInRegestrationProcess() {
    let password = document.getElementById('new-user-inputfield-pw').value;
    let passwortRepeat = document.getElementById('new-user-inputfield-pw-repeat').value;

    if (password == passwortRepeat) {
        takeInfosFromRegistration()
    }
    else {
        showRegistrationAlertContent();
        setTimeout(hideRegistrationAlertContent, timeInfoShown)
    }
}


function showRegistrationAlertContent() {
    let alertContent = document.getElementById('registration-check-password-alert')
    alertContent.classList.remove('d-none')
}


function hideRegistrationAlertContent() {
    let alertContent = document.getElementById('registration-check-password-alert')
    alertContent.classList.add('d-none')
}


function submitNewUser() {
    let newUser = userRegistrationObj.name
    if (checkIfUserNameAlreadyExist(newUser) == true) {
        showRegistrationAlertUserAlreadyExist()
        setTimeout(hideRegistrationAlertUserAlreadyExist, timeInfoShown)
    }
    else {
        if (noIconIsSelected()) {
            openWindowAskForConfirmationToUseUnknownImage();
        }
        else {
            pushNewUserInArrayUsers()
        }
    }
}


function showRegistrationAlertUserAlreadyExist() {
    let alertReadyForLogin = document.getElementById('registration-user-already-exist-alert')
    alertReadyForLogin.classList.remove('d-none')
}


function hideRegistrationAlertUserAlreadyExist() {
    let alertReadyForLogin = document.getElementById('registration-user-already-exist-alert')
    alertReadyForLogin.classList.add('d-none')
}


function checkIfUserNameAlreadyExist(newUser) {
    return users.some(user => user.name === newUser.value);
}


function takeInfosFromRegistration() {
    let newUser = document.getElementById('new-user-inputfield-login');
    let newUserPassword = document.getElementById('new-user-inputfield-pw');
    let newUserMail = document.getElementById('new-user-inputfield-mail');
    let newUserTel = document.getElementById('new-user-inputfield-tel');
    let newUserCity = document.getElementById('new-user-inputfield-city');
    let newUserCategory = document.getElementById('new-user-inputfield-category');
    let newUserHobby = document.getElementById('new-user-inputfield-hobby');
    let iconSource = temporaryIconArray[0];

    createÚserRegistrationObj(newUser, newUserPassword, newUserMail, newUserTel, newUserCity, newUserCategory, newUserHobby, iconSource)
}


function createÚserRegistrationObj(newUser, newUserPassword, newUserMail, newUserTel, newUserCity, newUserCategory, newUserHobby, iconSource) {
    userRegistrationObj = {
        "id": "",
        "name": newUser.value,
        "password": newUserPassword.value,
        "icon": iconSource,
        "category": newUserCategory.value,
        "Hobbys": newUserHobby.value,
        "city": newUserCity.value,
        "mail": newUserMail.value,
        "telephon": newUserTel.value
    };
    submitNewUser();
}


function pushNewUserInArrayUsers() {
    let userId = users.length;
    userRegistrationObj.id = userId

    users.push(userRegistrationObj);
    loadUsers();
    closeRegisterBox();
    showRegistrationAlertReadyForLogin();

    setTimeout(hideRegistrationAlertReadyForLogin, timeInfoShown);
    uploadUser();
}


function showRegistrationAlertReadyForLogin() {
    let alertReadyForLogin = document.getElementById('registration-ready-for-login-alert')
    alertReadyForLogin.classList.remove('d-none')
}


function hideRegistrationAlertReadyForLogin() {
    let alertReadyForLogin = document.getElementById('registration-ready-for-login-alert')
    alertReadyForLogin.classList.add('d-none')
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
    let y = document.getElementById("new-user-inputfield-pw-repeat");
    if (y.type === "password") {
        y.type = "text";
    } else {
        y.type = "password";
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


function clearIconSelection() {
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
    userRegistrationObj.icon = iconSource
    closeAskForIconSelection();
    pushNewUserInArrayUsers();
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
    <img class="user-side-bar-img" src="${imageSource}" onclick="showUserDetails('${usersLoginName}')">
    `;
    setUserName(usersLoginName);
}


function setUserName(usersLoginName) {
    currentUser = usersLoginName;
    loadTaskFromBackend()
}


// Logout function
function executeLogout() {
    hideLogoutButton();
    showLoginButton();
    deleteUsersImageAfterLogout();
    openLoginBox()
    clearTasksArrayToHideForTestusers()
}

function clearTasksArrayToHideForTestusers() {
    tasks.length = 0;
    clearBoardAndBacklog()
}

function clearBoardAndBacklog() {
    renderBoard()
    renderBacklog()
}


function deleteUsersImageAfterLogout() {
    let content = document.getElementById('user');
    content.innerHTML = '';
}


/** Choice of user */
function loadUsers() {

    let userOptions = document.getElementById('all-users');

    userOptions.innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        const userName = users[i].name;
        userOptions.innerHTML += `<option value="${userName}" onclick="setUser(${userName})"></option>`;
    }
    loadAllUserNamesInArray() //for search function in Add Task
}


let userNames = [];

function loadAllUserNamesInArray() {
    for (let i = 0; i < users.length; i++) {
        const name = users[i].name;
        userNames.push(name)
    }
}


// Testuser

function loginAsTestuser() {
    document.getElementById('login-user-inputfield').value = 'Testuser'
    document.getElementById('login-user-inputfield-pw').value = 'e=mc²';
}


function showMoreRegistrationInput() {
    let content = document.getElementById('new-user-registration-input-more')
    if (document.getElementById('registration-box-input-more').classList.contains('d-none')) {
        content.innerHTML = 'less <'
        document.getElementById('registration-box-input-more').classList.remove('d-none')
    }
    else {
        content.innerHTML = 'more >'
        document.getElementById('registration-box-input-more').classList.add('d-none')
    }
}