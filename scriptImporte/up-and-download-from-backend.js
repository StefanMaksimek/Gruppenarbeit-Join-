setURL('https://gruppe-272.developerakademie.net/smallest_backend_ever-master');
//setURL('https://join.stefan-maksimek.de/smallest_backend_ever');

async function uploadUser() {
  await backend.setItem('users', JSON.stringify(users));
}

async function uploadTasks() {
  if (currentUser != 'testuser@gmail.net') {
    await backend.setItem('tasks', JSON.stringify(tasks));
  }
}

async function uploadIcons() {
  await backend.setItem('icons', JSON.stringify(icons));
}

async function init() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem(`users`)) || [];
  icons = JSON.parse(backend.getItem(`icons`)) || [];
  setTimeout(() => {
    loadAllUserNamesInArray();
    logInUserIfPossible();
  }, 2000);

}

async function loadTaskFromBackend() {
  if (currentUser != 'testuser@gmail.net') {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem(`tasks`)) || [];
  } else {
    tasks = testTasks;
  }

  renderBoard();
  renderBacklog();
  openBoard();
}


function logInUserIfPossible() {

  const usersLoginMail = localStorage.getItem('joinLoginMail');
  const usersLoginPW = localStorage.getItem('joinLoginPassword');
  if (usersLoginPW != null && usersLoginMail != null) {
    if (checkIfLoginParameterExist(usersLoginMail, usersLoginPW)) {
      showLogout();
      showUsersImage(usersLoginMail);
      hideLoginButton();
      closeLoginBox();
    }
  }
  document.getElementById('main').classList.remove('d-none')
  document.getElementById('side-bar').classList.remove('d-none')
  document.getElementById('loading-view').classList.add('d-none')
}
