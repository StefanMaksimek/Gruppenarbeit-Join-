

function renderBacklog() {
    let bc = document.getElementById('backlog-content')
    let tasksInBacklog = tasks.filter(t => t.locationTask == "backlog")

    bc.innerHTML = ``
    tasksInBacklog.reverse().forEach(task => {
        bc.innerHTML += renderBacklogHTML(task)
        if (task.user.length > 1) {
            document.getElementById(`assigned-to-${task.id}`).innerHTML += addUserInfoHTML(task)
        }
    });
    tasksInBacklog.reverse()
}


function openAcceptTask(id) {
    document.getElementById('myModal').classList.add('d-block')
    document.getElementById('show-backlog-details-container').classList.remove('d-none')

    fillBaacklogDetailBox(id)

}


function fillBaacklogDetailBox(id) {
    let task = tasks.find(e => e.id == id)

    document.getElementById('show-backlog-details-box-icon').innerHTML = '';
    task.user.forEach(e => {
        document.getElementById('show-backlog-details-box-icon').innerHTML += addUserIconsHTML(e)
    });


    document.getElementById('close-user-details-box-backlog').innerHTML = renderCloseIconBacklogDetailViewBox(id);
    document.getElementById('show-backlog-details-container').style = `border : 2px solid var(--clr-${task.category})`
    document.getElementById('show-backlog-details-box-icon').src = task.user[0].icon
    document.getElementById('show-backlog-details-box-category').innerHTML = task.category
    document.getElementById('show-backlog-details-box-title').innerHTML = task.title
    document.getElementById('show-backlog-details-box-priority').innerHTML = task.priority
    document.getElementById('show-backlog-details-box-due-date').innerHTML = transformTimeStampToDate(task.dueDate)
    document.getElementById('show-backlog-details-box-details').innerHTML = task.description
    document.getElementById('btn-holder-backlog').innerHTML = renderButtonsBacklog(id)
}


function closeBacklogDetails() {
    document.getElementById('myModal').classList.remove('d-block')
    document.getElementById('show-backlog-details-container').classList.add('d-none')
}


function changeTaskBacklog(id) {
    let currentTask = tasks.find(t => t.id == id);
    //assigned user
    setValuesForChangeTaskBacklogAssignedUser(currentTask)
    //title
    setValuesForChangeTaskBacklogTitle(currentTask);
    //category
    setValuesForChangeTaskBacklogCategory(currentTask);
    //due date
    setValuesForChangeTaskBacklogDueDate(currentTask);
    //priority
    setValuesForChangeTaskBacklogPriority(currentTask);
    //description
    setValuesForChangeTaskBacklogDescription(currentTask);
    //buttons
    document.getElementById('btn-holder-backlog').innerHTML = changeButtonsforEditorModusOnBacklogChangeTask(id);
}


function changeButtonsforEditorModusOnBacklogChangeTask(id) {
    return `<button class="push-task" style="background-color: red" onclick="setChangeModeOfBacklogTaskDetailsContainerBack('${id}')">Cancel</button><button class="push-task" style="background-color: green" onclick="saveChangesTaskBacklog('${id}', '')">Save</button>`
}


function setValuesForChangeTaskBacklogAssignedUser(currentTask) {
    document.getElementById('show-backlog-details-box-icon').classList.add('d-none')
    document.getElementById('show-backlog-details-box-icon-change').classList.remove('d-none')
    document.getElementById('responsible-editor-list-change-task-backlog').innerHTML = '';
    loadAlreadyAssignedUserInTemporaryArray(currentTask)
    currentTask.user.forEach(user => {
        document.getElementById('responsible-editor-list-change-task-backlog').innerHTML += renderSelectedEmployeesHTML(user.name, user.icon)
    });
}


function setValuesForChangeTaskBacklogDueDate(currentTask) {
    document.getElementById('show-backlog-details-box-due-date').classList.add('d-none')
    document.getElementById('due-date-backlog-details-box').classList.remove('d-none')
    document.getElementById('due-date-backlog-details-box').value = transformTimeStampToDate(currentTask.dueDate);
}


function setValuesForChangeTaskBacklogCategory(currentTask) {
    document.getElementById('show-backlog-details-box-category').classList.add('d-none')
    document.getElementById('category-state-input-change-detail-box-backlog').classList.remove('d-none')
    if (currentTask.category == 'IT') {
        document.getElementById('category-state-input-backlog-details-box-option-it').selected = 'selected'
    }
    if (currentTask.category == 'Marketing') {
        document.getElementById('category-state-input-backlog-details-box-option-marketing').selected = 'selected'
    }
    if (currentTask.category == 'Sales') {
        document.getElementById('category-state-input-backlog-details-box-option-sales').selected = 'selected'
    }
    if (currentTask.category == 'Management') {
        document.getElementById('category-state-input-backlog-details-box-option-management').selected = 'selected'
    }
}


function setValuesForChangeTaskBacklogTitle(currentTask) {
    document.getElementById('show-backlog-details-box-title').classList.add('d-none')
    document.getElementById('title-task-change-detail-box-backlog').classList.remove('d-none')
    document.getElementById('title-task-change-detail-input-backlog').value = currentTask.title
}


function setValuesForChangeTaskBacklogPriority(currentTask) {
    document.getElementById('show-backlog-details-box-priority').classList.add('d-none')
    document.getElementById('show-backlog-details-box-priority-change').classList.remove('d-none')
    if (currentTask.priority == 'normal') {
        document.getElementById('priority-state-input-backlog-details-box-option-normal').selected = 'selected'
    }
    else {
        document.getElementById('priority-state-input-backlog-details-box-option-high').selected = 'selected'
    }
}


function setValuesForChangeTaskBacklogDescription(currentTask) {
    document.getElementById('show-backlog-details-box-details').classList.add('d-none')
    document.getElementById('task-description-backlog-details-box').classList.remove('d-none')
    document.getElementById('task-description-backlog-details-input').value = currentTask.description
}


function setChangeModeOfBacklogTaskDetailsContainerBack(id) {
    setTemporaryArrayResponsibleEmployeesToStandard();
    //assigned user
    document.getElementById('show-backlog-details-box-icon').classList.remove('d-none');
    document.getElementById('show-backlog-details-box-icon-change').classList.add('d-none');
    //title
    document.getElementById('show-backlog-details-box-title').classList.remove('d-none');
    document.getElementById('title-task-change-detail-box-backlog').classList.add('d-none');
    //category
    document.getElementById('show-backlog-details-box-category').classList.remove('d-none');
    document.getElementById('category-state-input-change-detail-box-backlog').classList.add('d-none');
    //due date
    document.getElementById('show-backlog-details-box-due-date').classList.remove('d-none');
    document.getElementById('due-date-backlog-details-box').classList.add('d-none');
    //priority
    document.getElementById('show-backlog-details-box-priority').classList.remove('d-none');
    document.getElementById('show-backlog-details-box-priority-change').classList.add('d-none');
    //description
    document.getElementById('show-backlog-details-box-details').classList.remove('d-none');
    document.getElementById('task-description-backlog-details-box').classList.add('d-none');
    //buttons
    document.getElementById('btn-holder-backlog').innerHTML = renderButtonsBacklog(id);
}


function saveChangesTaskBacklog(id) {
    let currentTask = tasks.find(t => t.id == id);
    currentTask.category = document.getElementById('category-state-input-change-detail-box-backlog').value
    currentTask.title = document.getElementById('title-task-change-detail-input-backlog').value
    currentTask.dueDate = new Date(document.getElementById('due-date-backlog-details-box').value).getTime()
    currentTask.priority = document.getElementById('show-backlog-details-box-priority-change').value
    currentTask.description = document.getElementById('task-description-backlog-details-input').value
    currentTask.user.length = 0; //make it empty because all users will load again in the task on next step
    pushAllUsersInTask(currentTask)
    setTemporaryArrayResponsibleEmployeesToStandard()
    uploadTasks();
    renderBacklog();
    setChangeModeOfBacklogTaskDetailsContainerBack(id);
    closeBacklogDetails();
}


function deleteTask(id) {
    let currentTask = tasks.find(t => t.id == id);
    let index = tasks.indexOf(currentTask);
    tasks.splice(index, 1);
    uploadTasks();
    renderBacklog();
    closeBacklogDetails();
}


function pushTask(id, statusTask) {
    let currentTask = tasks.find(t => t.id == id);

    currentTask.locationTask = "board";
    setColorAndStatus(currentTask, statusTask)
    uploadTasks()
    closeBacklogDetails()
    renderBoard()
    renderBacklog()
    openBoard()
}


function setColorAndStatus(currentTask, statusTask) {
    if (statusTask == '') { //task create in add task area
        currentTask.status = document.getElementById('status-list-input').value;
    }
    else { //task create in board area
        currentTask.status = statusTask;
    }
    currentTask.color = temporaryArrayColor[0];
}