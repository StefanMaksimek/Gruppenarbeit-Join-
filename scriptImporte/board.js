let currentDraggedElement;
let startedTasks = []


function renderBoard() {
    startedTasks = tasks.filter(t => t.locationTask != "backlog") // load all tasks for board in an temporary Array

    renderToDo()
    renderInProgress()
    renderTesting()
    renderDone()
    startedTasks.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
}


function renderToDo() {
    let td = document.getElementById('to-do')

    td.innerHTML = ``
    startedTasks.filter(task => task.status == "to-do").forEach(toDos => {
        td.innerHTML += renderToDoHTML(toDos)
        for (let i = 0; i < toDos.user.length; i++) {
            const user = toDos.user[i];
            document.getElementById(`board-card-usericon${toDos.id}`).innerHTML += `<div style="left: calc(10px + 20px*${i})" class="assigned-to-user board-user-icon">
            <img onclick="showUserDetails('${user.name}')" src="${user.icon}">            
        </div>`
        }
    })
}


function renderInProgress() {
    let ip = document.getElementById('in-progress')

    ip.innerHTML = ``
    startedTasks.filter(task => task.status == "in-progress").forEach(inProgress => {
        ip.innerHTML += renderInProgressHTML(inProgress)
        for (let i = 0; i < inProgress.user.length; i++) {
            const user = inProgress.user[i];
            document.getElementById(`board-card-usericon${inProgress.id}`).innerHTML += `<div style="left: calc(10px + 20px*${i})" class="assigned-to-user board-user-icon">
            <img onclick="showUserDetails('${user.name}')" src="${user.icon}">            
        </div>`
        }
    })
}


function renderTesting() {
    let t = document.getElementById('testing')

    t.innerHTML = ``
    startedTasks.filter(task => task.status == "testing").forEach(testing => {
        t.innerHTML += renderTestingHTML(testing)

        for (let i = 0; i < testing.user.length; i++) {
            const user = testing.user[i];
            document.getElementById(`board-card-usericon${testing.id}`).innerHTML += `<div style="left: calc(10px + 20px*${i})" class="assigned-to-user board-user-icon">
            <img onclick="showUserDetails('${user.name}')" src="${user.icon}">            
        </div>`
        }
    })
}


function renderDone() {
    let d = document.getElementById('done')

    d.innerHTML = ``
    startedTasks.filter(task => task.status == "done").forEach(done => {
        d.innerHTML += renderDoneHTML(done)

        for (let i = 0; i < done.user.length; i++) {
            const user = done.user[i];
            document.getElementById(`board-card-usericon${done.id}`).innerHTML += `<div style="left: calc(10px + 20px*${i})" class="assigned-to-user board-user-icon">
            <img onclick="showUserDetails('${user.name}')" src="${user.icon}">            
        </div>`
        }
    })
}


function startDragging(id) {
    currentDraggedElement = id
}


function moveTo(status) {
    tasks.find(task => task.id == currentDraggedElement).status = status //change the status in main JSON
    uploadTasks()
    renderBoard()
    removeHighlight(status)
}


function highlight(id) {
    document.getElementById(id).parentElement.classList.add('drag-area-highlight')
}


function removeHighlight(id) {
    document.getElementById(id).parentElement.classList.remove('drag-area-highlight');
}


function openTaskDetails(id) {
    document.getElementById('myModal').classList.add('d-block');
    document.getElementById('show-board-details-container').classList.remove('d-none');

    fillBoardDetailBox(id);
    closeBoardAddTask();
}


function fillBoardDetailBox(id) {
    let task = tasks.find(e => e.id == id);

    document.getElementById('show-board-details-box-icon').innerHTML = '';
    task.user.forEach(e => {
        document.getElementById('show-board-details-box-icon').innerHTML += addUserIconsHTML(e);
    });

    document.getElementById('close-user-details-box-board').innerHTML = renderCloseIconBoardDetailViewBox(id);
    document.getElementById('show-board-details-container').style = `border : 2px solid var(--clr-${task.category})`;
    document.getElementById('show-board-details-box-icon').src = task.user[0].icon;
    document.getElementById('show-board-details-box-category').innerHTML = task.category;
    document.getElementById('show-board-details-box-title').innerHTML = task.title;
    document.getElementById('show-board-details-box-details').innerHTML = task.description;
    document.getElementById('show-board-details-box-btns').innerHTML = `<button class="push-task" style="background-color: red" onclick="deleteTaskBoard('${id}')">Delete Task</button><button class="push-task" style="background-color: #ffa500" onclick="changeTaskBoard('${id}', '')">Change Task</button>`;

    document.getElementById('show-board-details-box-created-on').innerHTML = new Date(task.createdAt).toISOString().substring(0, 10);
    document.getElementById('show-board-details-box-complete-by').innerHTML = new Date(task.dueDate).toISOString().substring(0, 10);
    document.getElementById('show-board-details-box-priority').innerHTML = task.priority;
}


function deleteTaskBoard(id) {
    let currentTask = tasks.find(t => t.id == id);
    let index = tasks.indexOf(currentTask);
    tasks.splice(index, 1);
    uploadTasks();
    renderBoard();
    closeBoardDetails();
}


function changeTaskBoard(id) {
    let currentTask = tasks.find(t => t.id == id);
    //assigned user
    setValuesForChangeTaskAssignedUser(currentTask)
    //title
    setValuesForChangeTaskTitle(currentTask);
    //category
    setValuesForChangeTaskCategory(currentTask);
    //due date
    setValuesForChangeTaskDueDate(currentTask);
    //priority
    setValuesForChangeTaskPriority(currentTask);
    //description
    setValuesForChangeTaskDescription(currentTask);
    //buttons
    document.getElementById('show-board-details-box-btns').innerHTML = changeButtonsforEditorModusOnBoardChangeTask(id);
}


function changeButtonsforEditorModusOnBoardChangeTask(id) {
    return `<button class="push-task" style="background-color: red" onclick="setChangeModeOfBoardTaskDetailsContainerBack('${id}')">Cancel</button><button class="push-task" style="background-color: green" onclick="saveChangesTask('${id}', '')">Save</button>`
}


function setValuesForChangeTaskAssignedUser(currentTask) {
    document.getElementById('show-board-details-box-icon').classList.add('d-none')
    document.getElementById('show-board-details-box-icon-change-detail-box').classList.remove('d-none')
    document.getElementById('responsible-editor-list-change-task-board').innerHTML = '';
    loadAlreadyAssignedUserInTemporaryArray(currentTask)
    currentTask.user.forEach(user => {
        document.getElementById('responsible-editor-list-change-task-board').innerHTML += renderSelectedEmployeesHTML(user.name, user.icon)
    });
}


function setValuesForChangeTaskDueDate(currentTask) {
    document.getElementById('show-board-details-box-complete-by').classList.add('d-none')
    document.getElementById('due-date-board-details-box').classList.remove('d-none')
    document.getElementById('due-date-board-details-box').value = transformTimeStampToDate(currentTask.dueDate);
}


function transformTimeStampToDate(timestamp) {
    let date = new Date(timestamp)
    return date.toISOString().split('T')[0]
}


function setValuesForChangeTaskCategory(currentTask) {
    document.getElementById('show-board-details-box-category').classList.add('d-none')
    document.getElementById('category-state-input-change-detail-box').classList.remove('d-none')
    if (currentTask.category == 'IT') {
        document.getElementById('category-state-input-board-details-box-option-it').selected = 'selected'
    }
    if (currentTask.category == 'Marketing') {
        document.getElementById('category-state-input-board-details-box-option-marketing').selected = 'selected'
    }
    if (currentTask.category == 'Sales') {
        document.getElementById('category-state-input-board-details-box-option-sales').selected = 'selected'
    }
    if (currentTask.category == 'Management') {
        document.getElementById('category-state-input-board-details-box-option-management').selected = 'selected'
    }
}


function setValuesForChangeTaskTitle(currentTask) {
    document.getElementById('show-board-details-box-title').classList.add('d-none')
    document.getElementById('title-task-change-detail-box').classList.remove('d-none')
    document.getElementById('title-task-change-detail-input').value = currentTask.title
}


function setValuesForChangeTaskPriority(currentTask) {
    document.getElementById('show-board-details-box-priority').classList.add('d-none')
    document.getElementById('priority-state-input-board-details-box').classList.remove('d-none')
    if (currentTask.priority == 'normal') {
        document.getElementById('priority-state-input-board-details-box-option-normal').selected = 'selected'
    }
    else {
        document.getElementById('priority-state-input-board-details-box-option-high').selected = 'selected'
    }
}


function setValuesForChangeTaskDescription(currentTask) {
    document.getElementById('show-board-details-box-details').classList.add('d-none')
    document.getElementById('task-description-board-details-box').classList.remove('d-none')
    document.getElementById('task-description-board-details-input').value = currentTask.description
}


function setChangeModeOfBoardTaskDetailsContainerBack(id) {
    setTemporaryArrayResponsibleEmployeesToStandard();
    //assigned user
    document.getElementById('show-board-details-box-icon').classList.remove('d-none')
    document.getElementById('show-board-details-box-icon-change-detail-box').classList.add('d-none')
    //title
    document.getElementById('show-board-details-box-title').classList.remove('d-none')
    document.getElementById('title-task-change-detail-box').classList.add('d-none')
    //category
    document.getElementById('show-board-details-box-category').classList.remove('d-none')
    document.getElementById('category-state-input-change-detail-box').classList.add('d-none')
    //due date
    document.getElementById('show-board-details-box-complete-by').classList.remove('d-none')
    document.getElementById('due-date-board-details-box').classList.add('d-none')
    //priority
    document.getElementById('show-board-details-box-priority').classList.remove('d-none')
    document.getElementById('priority-state-input-board-details-box').classList.add('d-none')
    //description
    document.getElementById('show-board-details-box-details').classList.remove('d-none')
    document.getElementById('task-description-board-details-box').classList.add('d-none')
    //buttons
    document.getElementById('show-board-details-box-btns').innerHTML = `<button class="push-task" style="background-color: red" onclick="deleteTaskBoard('${id}')">Delete Task</button><button class="push-task" style="background-color: #ffa500" onclick="changeTaskBoard('${id}', '')">Change Task</button>`
}



function saveChangesTask(id) {
    let currentTask = tasks.find(t => t.id == id);
    currentTask.category = document.getElementById('category-state-input-change-detail-box').value
    currentTask.title = document.getElementById('title-task-change-detail-input').value
    currentTask.dueDate = new Date(document.getElementById('due-date-board-details-box').value).getTime()
    currentTask.priority = document.getElementById('priority-state-input-board-details-box').value
    currentTask.description = document.getElementById('task-description-board-details-input').value
    currentTask.user.length = 0; //make it empty because all users will load again in the task on next step
    pushAllUsersInTask(currentTask)
    setTemporaryArrayResponsibleEmployeesToStandard()
    uploadTasks();
    renderBoard();
    setChangeModeOfBoardTaskDetailsContainerBack(id);
    closeBoardDetails();
}


function closeBoardDetails() {
    document.getElementById('myModal').classList.remove('d-block')
    document.getElementById('show-board-details-container').classList.add('d-none')
}


function openOrCloseSidebarCreateTask() {
    if (sideBarTaskContainerIsHidden()) {
        document.getElementById('side-bar-task').classList.remove('d-none')
    }
    else {
        document.getElementById('side-bar-task').classList.add('d-none')
    }
    clearAddTask()
}


function closeBoardAddTask() {
    if (!sideBarTaskContainerIsHidden()) {
        document.getElementById('side-bar-task').classList.add('d-none')
    }
}


function sideBarTaskContainerIsHidden() {
    return document.getElementById('side-bar-task').classList.contains('d-none')
}


function showHintForBin() {
    document.getElementById('bin-hint-sidebar-task').classList.remove('d-none')
}

function hideHintForBin() {
    document.getElementById('bin-hint-sidebar-task').classList.add('d-none')
}