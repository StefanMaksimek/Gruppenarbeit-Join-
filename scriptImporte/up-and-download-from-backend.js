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
    tasks = createTestTasks();
  }

  renderBoard();
  renderBacklog();
  openSummary();
}


function createTestTasks() {
  let testUserTasks = [];
  for (let i = 0; i < testTasks.length; i++) {
    const taskForTestUser = testTasks[i];
    let taskInfo = createJsonForTestTask(taskForTestUser.id, taskForTestUser.title, taskForTestUser.priority, taskForTestUser.category, taskForTestUser.createdAt, taskForTestUser.dueDate, taskForTestUser.user, taskForTestUser.status, taskForTestUser.description, taskForTestUser.color, taskForTestUser.locationTask)
    let task = new Task(taskInfo);
    testUserTasks.push(task);
  }
  return testUserTasks;
}


function createJsonForTestTask(id, title, priority, category, createdAt, dueDate, user, status, description, color, locationTask) {
  let taskInfo = {
    "id": id,
    "title": title,
    "priority": priority,
    "category": category,
    "createdAt": createdAt,
    "dueDate": dueDate,
    "user": user,
    "status": status,
    "description": description,
    "color": color,
    "locationTask": locationTask //where the task is rendered
  }
  return taskInfo;
}


function logInUserIfPossible() {

  const usersLoginMail = localStorage.getItem('joinLoginMail');
  const usersLoginPW = localStorage.getItem('joinLoginPassword');
  if (usersLoginPW != null && usersLoginMail != null) {
    if (checkIfLoginParameterExist(usersLoginMail, usersLoginPW)) {
      showUsersImage(usersLoginMail);
      closeLoginBox();
    }
  }
  document.getElementById('main').classList.remove('d-none')
  document.getElementById('side-bar').classList.remove('d-none')
  document.getElementById('loading-view').classList.add('d-none')
}
