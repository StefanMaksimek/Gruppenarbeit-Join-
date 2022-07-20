
/////////////////////////// HTML Snippets for Backlog


/**
 * 
 * @param {*} task JSON
 * @returns HTML snippet for renderBacklog function
 */
function renderBacklogHTML(task) {
    // Shows only the first USER! forEach cannot be reapplied
    return `
        <tr class="backlog-hover" onclick="openAcceptTask(${task.id})">
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
            <td class="details">${task.description}</td>
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
            <img src="${user.icon}" alt="">
            <h3>${user.name}</h3>                  
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
        <div class="to-do" onclick="openTaskDetails(${toDos.id})" style="border-left: 10px solid ${toDos.color}" draggable="true" ondragstart="startDragging(${toDos["id"]})">
            <div class="board-card-header">
                <h4>${toDos.title}</h4>
            </div>

            <div class="board-card-info">
                <span>Assinged to:</span>
                <div class="board-card-usericon" id="board-card-usericon${toDos.id}">
                </div>
            </div>

            <div class="board-card-department" style="border: 5px solid var(--clr-${toDos.category})">
                <span>Department:</span>
                <span>${toDos.category}</span>
            </div>
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
    <div class="to-do" onclick="openTaskDetails(${inProgress.id})" style="border-left: 10px solid ${inProgress.color}" draggable="true" ondragstart="startDragging(${inProgress["id"]})">
        <div class="board-card-header">
            <h4>${inProgress.title}</h4>
        </div>

        <div class="board-card-info">
            <span>Assinged to:</span>
            <div class="board-card-usericon" id="board-card-usericon${inProgress.id}">
            </div>
        </div>

        <div class="board-card-department" style="border: 5px solid var(--clr-${inProgress.category})">
            <span>Department:</span>
            <span>${inProgress.category}</span>
        </div>
    </div>    `
}


/**
 * 
 * @param {*} testing JSON 
 * @returns HTML snippet for renderTesting function
 */
function renderTestingHTML(testing) {
    return `
    <div class="to-do" onclick="openTaskDetails(${testing.id})" style="border-left: 10px solid ${testing.color}" draggable="true" ondragstart="startDragging(${testing["id"]})">
        <div class="board-card-header">
            <h4>${testing.title}</h4>
        </div>

        <div class="board-card-info">
            <span>Assinged to:</span>
            <div class="board-card-usericon" id="board-card-usericon${testing.id}">
            </div>
        </div>

        <div class="board-card-department" style="border: 5px solid var(--clr-${testing.category})">
            <span>Department:</span>
            <span>${testing.category}</span>
        </div>
    </div>    `
}


/**
 * 
 * @param {*} done JSON 
 * @returns HTML snippet for renderDone function
 */
function renderDoneHTML(done) {
    return `
    <div class="to-do" onclick="openTaskDetails(${done.id})" style="border-left: 10px solid ${done.color}" draggable="true" ondragstart="startDragging(${done["id"]})">
        <div class="board-card-header">
            <h4>${done.title}</h4>
        </div>

        <div class="board-card-info">
            <span>Assinged to:</span>
            <div class="board-card-usericon" id="board-card-usericon${done.id}">
            </div>
        </div>

        <div class="board-card-department" style="border: 5px solid var(--clr-${done.category})">
            <span>Department:</span>
            <span>${done.category}</span>
        </div>
    </div>    `
}
/////////////////////////////////////////////////////////////////////////////////


/////////////////////////// HTML Snippets for Add Task





function renderSearchedEmployeesHTML(user, icon){
    return `
    <div class="list-search-result" id="${user}-${icon}">
    <img src="${icon}" onclick="addUserToResponsibleEmployees('${user}', '${icon}')">
        <div id="responsible-employees-${user}" class="list-search-result-name-under-icon" onclick="addUserToResponsibleEmployees('${user}', '${icon}')">${user}</div>
    </div>`
}


function renderSelectedEmployeesHTML(name, img){
    return `<div draggable="true" ondragstart="getResponsibleEmployeeForDelete('${name}', '${img}')" class="responsible-editor-container-box">
    <img id="${name}-responsible-editor-img" class="list-search-result-img" src="${img}" onclick="showUserDetails('${name}')">
    <div class="name-responsible-editor crop" onclick="showUserDetails('${name}')">${name}</div>
    </div> 
    `
}