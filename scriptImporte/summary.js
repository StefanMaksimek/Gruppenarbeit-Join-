function loadSummaryContent() {
    let userMail = localStorage.getItem('joinLoginMail')
    let tasksOfUser = [];
    tasks.forEach(task => {
        if (task.user.some(user => user.mail == userMail)) {
            tasksOfUser.push(task)
        }
    })
    if (tasksOfUser.length > 0) {
        document.getElementById('summary-nbr-tasks-board').innerHTML = tasksOfUser.filter(t => t.locationTask == 'board').length;
        document.getElementById('summary-nbr-tasks-backlog').innerHTML = tasksOfUser.filter(t => t.locationTask == 'backlog').length;
        document.getElementById('summary-nbr-tasks-feedback').innerHTML = tasksOfUser.filter(t => t.status == 'testing').length;
        document.getElementById('summary-nbr-tasks-progress').innerHTML = tasksOfUser.filter(t => t.status == 'in-progress').length;
        document.getElementById('summary-to-do-nbr').innerHTML = tasksOfUser.filter(t => t.status == 'to-do' && t.locationTask == 'board').length;
        document.getElementById('summary-done-nbr').innerHTML = tasksOfUser.filter(t => t.status == 'done' && t.locationTask == 'board').length;
        let urgentsTasks = findUrgentTasks(tasksOfUser);
        document.getElementById('summary-urgent-nbr').innerHTML = urgentsTasks.length;
    }
    else {
        fillSummaryCardsWithZero()
    }
    document.getElementById('summary-name').innerHTML = returnUsersName();
}


function fillSummaryCardsWithZero(){
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
    let urgentTasks = tasksOfUser.filter(t => t.dueDate <= currentDate + 864000000)
    getUrgentTasksNextDate(urgentTasks)
    return urgentTasks
}


function getUrgentTasksNextDate(urgentTasks) {
    let newSortedUrgentTasks = urgentTasks.sort(function (a, b) { return a.dueDate - b.dueDate })
    document.getElementById('summary-next-due-date').innerHTML = new Date(newSortedUrgentTasks[0].dueDate).toISOString().substring(0, 10);
}


function returnUsersName() {
    const usersMail = localStorage.getItem('joinLoginMail');
    let user = users.find(u => u.mail == usersMail)
    console.log(user)
    return user.name
}

