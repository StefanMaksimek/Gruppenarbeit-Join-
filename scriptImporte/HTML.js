
/////////////////////////// HTML Snippets for Backlog


/**
 * 
 * @param {*} task JSON
 * @returns HTML snippet for renderBacklog function
 */
function renderBacklogHTML(task) {
    // Shows only the first USER! forEach cannot be reapplied
    return `
        <tr class="backlog-card backlog-hover" onclick="openAcceptTask('${task.id}')">
            <td style="border-left:0.4rem solid var(--clr-${task.category}">
                <div class="assigned-to-holder">
                    <img class="backlog-responsive table-img" src="${task.user[0].icon}" alt="">

                    <div class="assigned-to" id="assigned-to-${task.id}">
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


function addUserInfoHTML(task) {
    return `
        <div class="backlog-user-info">
            +${task.user.length}
        </div>
    `
}


function addUserIconsHTML(user) {

    return `
        <div class="assigned-to-user">
            <img onclick="showUserDetails('${user.mail}')" src="${user.icon}" alt="">
            <h3>${user.name}</h3>                  
        </div>
    `
}


function addUserIconsHTMLWithoutName(user) {

    return `
        <div class="assigned-to-user board-user-icon">
            <img src="${user.icon}" alt="">            
        </div>
    `
}


function colorPickerHTML(color) {
    return `
        <div class="color-picker-box" onclick="takeColor('var(--color-${color})')"
            style="background-color: var(--color-${color});">
        </div>
    `
}
/////////////////////////// HTML Snippets for Board


/**
 * 
 * @param {*} toDos JSON 
 * @returns HTML snippet for renderToDo function
 */
function renderToDoHTML(toDos) {
    return `
        <div class="to-do" style="border-left: 10px solid ${toDos.color}" draggable="true" ondragstart="startDragging('${toDos["id"]}')">
        <div class="board-card-department" style="background-color: var(--clr-${toDos.category})">
                <div>Department:</div>
                <span>${toDos.category}</span>
            </div>    

            <div class="board-card-info-icon-box"  onclick="openTaskDetails('${toDos.id}')">
            <img src="./img/info-icon.png">
        </div>

        <div class="board-card-header">
                <h4>${toDos.title}</h4>
            </div>

            <div class="board-card-info">
                <span>Assinged to:</span>
                <div class="board-card-usericon user-board" id="board-card-usericon${toDos.id}">
                </div>
            </div>
            <img class="board-card-priority-icon" src="img/logos/icon-priority-${toDos.priority}.svg">
        </div>
    `
}


/**
 * 
 * @param {*} inProgress JSON 
 * @returns HTML snippet for renderInProgress function
 */
function renderInProgressHTML(inProgress) {
    return `
    <div class="to-do" style="border-left: 10px solid ${inProgress.color}" draggable="true" ondragstart="startDragging('${inProgress["id"]}')">
        <div class="board-card-department" style="background-color: var(--clr-${inProgress.category})">
            <div>Department:</div>
            <span>${inProgress.category}</span>
        </div>
    
        <div class="board-card-info-icon-box"  onclick="openTaskDetails('${inProgress.id}')">
        <img src="./img/info-icon.png">
    </div>

    <div class="board-card-header">
            <h4>${inProgress.title}</h4>
        </div>

        <div class="board-card-info">
            <span>Assinged to:</span>
            <div class="board-card-usericon user-board" id="board-card-usericon${inProgress.id}">
            </div>
        </div>
        <img class="board-card-priority-icon" src="img/logos/icon-priority-${inProgress.priority}.svg">
    </div>    `
}


/**
 * 
 * @param {*} testing JSON 
 * @returns HTML snippet for renderTesting function
 */
function renderTestingHTML(testing) {
    return `
    <div class="to-do" style="border-left: 10px solid ${testing.color}" draggable="true" ondragstart="startDragging('${testing["id"]}')">
    <div class="board-card-department" style="background-color: var(--clr-${testing.category})">
            <div>Department:</div>
            <span>${testing.category}</span>
        </div>    

        <div class="board-card-info-icon-box"  onclick="openTaskDetails('${testing.id}')">
        <img src="./img/info-icon.png">
    </div>
    
    <div class="board-card-header">
            <h4>${testing.title}</h4>
        </div>

        <div class="board-card-info">
            <span>Assinged to:</span>
            <div class="board-card-usericon user-board" id="board-card-usericon${testing.id}">
            </div>
        </div>
        <img class="board-card-priority-icon" src="img/logos/icon-priority-${testing.priority}.svg">
    </div>    `
}


/**
 * 
 * @param {*} done JSON 
 * @returns HTML snippet for renderDone function
 */
function renderDoneHTML(done) {
    return `
    <div class="to-do"style="border-left: 10px solid ${done.color}" draggable="true" ondragstart="startDragging('${done["id"]}')">
        <div class="board-card-department" style="background-color: var(--clr-${done.category})">
            <div>Department:</div>
            <span>${done.category}</span>
            </div>   

        <div class="board-card-info-icon-box"  onclick="openTaskDetails('${done.id}')">
            <img src="./img/info-icon.png">
        </div>

    <div class="board-card-header">
            <h4>${done.title}</h4>
        </div>

        <div class="board-card-info">
            <span>Assinged to:</span>
            <div class="board-card-usericon user-board" id="board-card-usericon${done.id}">
            </div>
        </div>
        <img class="board-card-priority-icon" src="img/logos/icon-priority-${done.priority}.svg">
    </div>    `
}
/////////////////////////////////////////////////////////////////////////////////


/////////////////////////// HTML Snippets for Add Task





function renderSearchedEmployeesHTML(user, icon) {
    return `
    <div class="list-search-result" id="${user}-${icon}">
    <img src="${icon}" onclick="addUserToResponsibleEmployees('${user}', '${icon}')">
        <div id="responsible-employees-${user}" class="list-search-result-name-under-icon" onclick="addUserToResponsibleEmployees('${user}', '${icon}')">${user}</div>
    </div>`
}


function renderSelectedEmployeesHTML(name, img, mail) {
    return `<div draggable="true" ondragstart="getResponsibleEmployeeForDelete('${mail}', '${img}')" class="responsible-editor-container-box">
    <img id="${name}-responsible-editor-img" class="list-search-result-img" src="${img}" onclick="showUserDetails('${mail}')">
    <div class="name-responsible-editor crop" onclick="showUserDetails('${mail}')">Click for infos</div>
    </div> 
    `
}


function renderButtonsBacklog(id) {
    return `<button class="login-area-btn login-area-btn-guest login-btn-shadow change-task-detail-view-btn-small" onclick="deleteTask('${id}')"><span>Delete </span><img src="img/logos/icon-bin.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px;"></button>
    <button class="login-area-btn login-area-btn-login login-btn-shadow change-task-detail-view-btn-small" onclick="changeTaskBacklog('${id}')"><span>Change </span><img src="img/logos/icon-pencil.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px;"></button>
    <button class="login-area-btn login-area-btn-guest login-btn-shadow change-task-detail-view-btn-small" onclick="pushTask('${id}', '')"><span>Accept </span><img src="img/logos/icon-accept.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px;"></button>`
}


function renderCloseIconBacklogDetailViewBox(id) {
    return `<div class="btn-close-cross-box" onclick="closeBacklogDetails(); setChangeModeOfBacklogTaskDetailsContainerBack('${id}')">
<img src="./img/close-icon.png">
</div>`
}


function renderCloseIconBoardDetailViewBox(id) {
    return `<div class="btn-close-cross-box"
    onclick="closeBoardDetails(); setChangeModeOfBoardTaskDetailsContainerBack('${id}')">
    <img src="./img/close-icon.png">
</div>`
}