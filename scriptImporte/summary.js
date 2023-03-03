function loadSummaryContent() {
    let userMail = localStorage.getItem('joinLoginMail')
    let tasksOfUser = [];
    tasks.forEach(task => {
        if (task.user.some(user => user.mail == userMail)) {
            tasksOfUser.push(task)
        }
    })
    document.getElementById('summary-nbr-tasks-board').innerHTML = tasksOfUser.length;
}