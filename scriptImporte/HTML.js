
// HTML Snippets for Backlog
/**
 * 
 * @param {*} task JSON
 * @returns HTML snippet for renderBacklog function
 */
function renderBacklogHTML(task) {
    // Shows only the first USER! forEach cannot be reapplied
    return `
        <tr>
            <td class="assigned-to" style="border-left:0.4rem solid var(--clr-${task.category}">
                <img src="${task.user[0].icon}" alt="">
            </td>
            <td class="assigned-to">
                <h3>${task.user[0].user}</h3>
                <a href="mailto:s.raile86@gmail.com">s.raile86@gmail.com</a>
            </td>
            <td class="category">${task.category}</td>
            <td class="details">${task.description}</td>
        </tr>
    `
}


// HTML Snippets for Board
/**
 * 
 * @param {*} toDos JSON 
 * @returns HTML snippet for renderToDo function
 */
function renderToDoHTML(toDos) {
    return `
        <div class="to-do" draggable="true" ondragstart="startDragging(${toDos["due-date"]})">${toDos.title}</div>
    `
}


/**
 * 
 * @param {*} toDos JSON 
 * @returns HTML snippet for renderInProgress function
 */
function renderInProgressHTML(inProgress) {
    return `
        <div class="to-do" draggable="true" ondragstart="startDragging(${inProgress["due-date"]})">${inProgress.title}</div>
    `
}


/**
 * 
 * @param {*} toDos JSON 
 * @returns HTML snippet for renderTesting function
 */
function renderTestingHTML(testing) {
    return `
        <div class="to-do" draggable="true" ondragstart="startDragging(${testing["due-date"]})">${testing.title}</div>
    `
}


/**
 * 
 * @param {*} toDos JSON 
 * @returns HTML snippet for renderDone function
 */
function renderDoneHTML(done) {
    return `
        <div class="to-do" draggable="true" ondragstart="startDragging(${done["due-date"]})">${done.title}</div>
    `
}