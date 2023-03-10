function loadSummaryContent() {
    let userMail = localStorage.getItem('joinLoginMail')
    let tasksOfUser = [];
    tasksOfUser = getUsersTasks(userMail);
    if (tasksOfUser.length > 0) {
        fillSummaryCardsWithTaskOfUsers(tasksOfUser);
    }
    else {
        fillSummaryCardsWithZero();
    }
    document.getElementById('summary-name').innerHTML = returnUsersName();
}


function getUsersTasks(userMail) {
    let tasksOfUser = [];
    tasks.forEach(task => {
        if (task.user.some(user => user.mail == userMail)) {
            tasksOfUser.push(task)
        }
    })
    return tasksOfUser;
}


function fillSummaryCardsWithTaskOfUsers(tasksOfUser) {
    document.getElementById('summary-nbr-tasks-board').innerHTML = tasksOfUser.filter(t => t.locationTask == 'board').length;
    document.getElementById('summary-nbr-tasks-backlog').innerHTML = tasksOfUser.filter(t => t.locationTask == 'backlog').length;
    document.getElementById('summary-nbr-tasks-feedback').innerHTML = tasksOfUser.filter(t => t.status == 'testing').length;
    document.getElementById('summary-nbr-tasks-progress').innerHTML = tasksOfUser.filter(t => t.status == 'in-progress').length;
    document.getElementById('summary-to-do-nbr').innerHTML = tasksOfUser.filter(t => t.status == 'to-do' && t.locationTask == 'board').length;
    document.getElementById('summary-done-nbr').innerHTML = tasksOfUser.filter(t => t.status == 'done' && t.locationTask == 'board').length;
    let urgentsTasks = findUrgentTasks(tasksOfUser);
    document.getElementById('summary-urgent-nbr').innerHTML = urgentsTasks.length;
}


function fillSummaryCardsWithZero() {
    document.getElementById('summary-nbr-tasks-board').innerHTML = 0;
    document.getElementById('summary-nbr-tasks-backlog').innerHTML = 0;
    document.getElementById('summary-nbr-tasks-feedback').innerHTML = 0;
    document.getElementById('summary-nbr-tasks-progress').innerHTML = 0;
    document.getElementById('summary-to-do-nbr').innerHTML = 0;
    document.getElementById('summary-done-nbr').innerHTML = 0;
    document.getElementById('summary-urgent-nbr').innerHTML = 0;
}

//find tasks with deadline behind or in 10 days
function findUrgentTasks(tasksOfUser) {
    let currentDate = new Date().getTime();
    //10day in milliseconds are 864000000
    if (tasks.length > 0) {
        let urgentTasks = tasksOfUser.filter(t => t.dueDate <= currentDate + 864000000)
        getUrgentTasksNextDate(urgentTasks)
        return urgentTasks
    }
    else {
        return [];
    }
}


function getUrgentTasksNextDate(urgentTasks) {
    let newSortedUrgentTasks = urgentTasks.sort(function (a, b) { return a.dueDate - b.dueDate })
    document.getElementById('summary-next-due-date').innerHTML = new Date(newSortedUrgentTasks[0].dueDate).toISOString().substring(0, 10);
}


function returnUsersName() {
    const usersMail = localStorage.getItem('joinLoginMail');
    let user = users.find(u => u.mail == usersMail)
    return user.name
}


function changeOverview(x, y) {
    document.getElementById(`summary-show-${x}-task-box`).classList.add('text-underline')
    document.getElementById(`summary-show-${y}-task-box`).classList.remove('text-underline')
    if (x == 'all') {
        loadSummaryAllTasksContent();
    }
    else {
        loadSummaryContent();
    }
}


function loadSummaryAllTasksContent() {
    document.getElementById('summary-nbr-tasks-board').innerHTML = tasks.filter(t => t.locationTask == 'board').length;
    document.getElementById('summary-nbr-tasks-backlog').innerHTML = tasks.filter(t => t.locationTask == 'backlog').length;
    document.getElementById('summary-nbr-tasks-feedback').innerHTML = tasks.filter(t => t.status == 'testing').length;
    document.getElementById('summary-nbr-tasks-progress').innerHTML = tasks.filter(t => t.status == 'in-progress').length;
    document.getElementById('summary-to-do-nbr').innerHTML = tasks.filter(t => t.status == 'to-do' && t.locationTask == 'board').length;
    document.getElementById('summary-done-nbr').innerHTML = tasks.filter(t => t.status == 'done' && t.locationTask == 'board').length;
    let urgentTasks = findUrgentTasks(tasks);
    document.getElementById('summary-urgent-nbr').innerHTML = urgentTasks.length;
}


function getUrgentTasks() {
    if (document.getElementById('summary-show-my-task-box').classList.contains('text-underline')) {
        let userMail = localStorage.getItem('joinLoginMail')
        let tasksOfUser = [];
        tasksOfUser = getUsersTasks(userMail);
        let urgentTasks = findUrgentTasks(tasksOfUser);
        showUrgentTasks(urgentTasks)
    }
    if (document.getElementById('summary-show-all-task-box').classList.contains('text-underline')) {
        let urgentTasks = findUrgentTasks(tasks);
        showUrgentTasks(urgentTasks)
    }
}


function showUrgentTasks(urgentTasks) {
    document.getElementById('show-urgent-tasks-summary').classList.remove('d-none')
    let content = document.getElementById('urgent-tasks-summary-content')
    content.innerHTML = '';
    for (let i = 0; i < urgentTasks.length; i++) {
        const task = urgentTasks[i];
        content.innerHTML += `
        <tr class="backlog-card backlog-hover" onclick="openTaskSummary('${task.id}')">
            <td style="border-left:0.4rem solid var(--clr-${task.category}">
                <div class="assigned-to-holder">
                    <img class="backlog-responsive table-img" src="${task.user[0].icon}" alt="">

                    <div class="assigned-to-summary" id="assigned-to-${task.id}">
                        <h3>${task.user[0].name}</h3>
                        <a href="mailto:${task.user[0].mail}">${task.user[0].mail}</a>
                    </div>
                </div>
            </td>

            <td class="category backlog-responsive">${task.category}</td>
            <td class="details">${task.title}</td>
        </tr>
    `
    }
}


function closeUrgentDetails() {
    document.getElementById('show-urgent-tasks-summary').classList.add('d-none')
}


function openTaskSummary(taskId) {
    let task = tasks.find(t => t.id == taskId)
    if (task.locationTask == 'board') {
        // openBoard();
        // closeUrgentDetails();
        openTaskDetails(taskId);
    }
    if (task.locationTask == 'backlog') {
        // openBacklog(); 
        // closeBoardAddTask();
        // closeUrgentDetails();
        openAcceptTask(taskId);

    }
}