

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
    document.getElementById('show-backlog-details-box-category').innerHTML = `<div style="background-color: var(--clr-${task.category})" class="board-task-detail-box">${task.category}</div>`;
    document.getElementById('show-backlog-details-box-title').innerHTML = task.title
    document.getElementById('show-backlog-details-box-priority').innerHTML = returnTaskPriority(task.priority);
    document.getElementById('show-backlog-details-box-due-date').innerHTML = returnTaskDate(new Date(task.dueDate).toISOString().substring(0, 10));
    document.getElementById('show-backlog-details-box-created-by').innerHTML = returnTaskDate(new Date(task.createdAt).toISOString().substring(0, 10));
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
    document.getElementById('show-backlog-details-color-status-box').classList.add('d-none')
}


function changeButtonsforEditorModusOnBacklogChangeTask(id) {
    return `<button class="login-area-btn login-area-btn-guest login-btn-shadow change-task-detail-view-btn-small" onclick="setChangeModeOfBacklogTaskDetailsContainerBack('${id}')"><span class="btn-text">Cancel </span><img src="img/close-icon.png" style="height: 16px; object-fit: cover; padding-bottom: 2px;"></button><button class="login-area-btn login-area-btn-login login-btn-shadow change-task-detail-view-btn-small" onclick="saveChangesTaskBacklog('${id}', '')"><span class="btn-text">Save </span><img src="img/logos/icon-save-white.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px;"></button>`
}


function setValuesForChangeTaskBacklogAssignedUser(currentTask) {
    document.getElementById('show-backlog-details-box-icon').classList.add('d-none')
    document.getElementById('show-backlog-details-box-icon-change').classList.remove('d-none')
    document.getElementById('responsible-editor-list-change-task-backlog').innerHTML = '';
    loadAlreadyAssignedUserInTemporaryArray(currentTask)
    currentTask.user.forEach(user => {
        document.getElementById('responsible-editor-list-change-task-backlog').innerHTML += renderSelectedEmployeesHTML(user.name, user.icon, user.mail)
    });
}


function setValuesForChangeTaskBacklogDueDate(currentTask) {
    document.getElementById('show-backlog-details-box-due-date').classList.add('d-none')
    document.getElementById('due-date-backlog-details-box').classList.remove('d-none')
    document.getElementById('due-date-backlog-details-box').value = transformTimeStampToDate(currentTask.dueDate);
}


function setValuesForChangeTaskBacklogCategory(currentTask) {
    document.getElementById('show-backlog-details-box-category').classList.add('d-none')
    document.getElementById('show-backlog-details-box-category-change').classList.remove('d-none')
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
    if (currentTask.priority == 'medium') {
        document.getElementById('priority-state-input-backlog-details-box-option-normal').selected = 'selected'
    }
    if (currentTask.priority == 'low') {
        document.getElementById('priority-state-input-backlog-details-box-option-low').selected = 'selected'
    }
    if (currentTask.priority == 'high') {
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
    document.getElementById('show-backlog-details-box-category-change').classList.add('d-none');
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
    if (id != '') {
        document.getElementById('btn-holder-backlog').innerHTML = renderButtonsBacklog(id);
    }
    document.getElementById('show-backlog-details-color-status-box').classList.remove('d-none')

    //Clear responsible user List
    document.getElementById('responsible-editor-list-change-task-backlog').innerHTML = '';
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