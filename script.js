


//Wir brauchen für den Bereich "editor" bei Add Task  ein Array mit allen Teilnehmern, die Zugang zu der Liste haben. Überschneidung mit Login
let editors = [
    {"name": 'Martin',
    "password": '*****'},

    {"name": 'Stefan',
    "password": '*****'}, 

    {"name": 'Julia',
    "password": '*****'},

    {"name": 'Michael',
    "password": '*****'},

    {"name": 'Sahra',
    "password": '*****'}
]

let tasks = [
    {
        "title": 'Design of Concept',
        "priority": 'high',
        "category": 'IT',
        "due-date": '',
        "editor": 'Martin',
        "status": 'ToDo',
        "description": 'create some ideas how we can resolve the problem of the responsible design and the arrangement of the object of the side'
    }
]

//the current editor will be chosen by login
let currentEditor;



// Login function


function submitNewEditor(){
    let newEditor = document.getElementById('new-editor-inputfield-login')
    let newEditorPassword = document.getElementById('new-editor-inputfield-pw')
    let editor = {
        "name": newEditor.value,
        "password": newEditorPassword.value
    };

    editors.push(editor);
    newEditor.value = '';
    newEditorPassword.value = '';
    loadEditors();
}
/** Choice of editor */
function loadEditors() {

    let editorOptions = document.getElementById('all-editors');
    let taskEditors = document.getElementById('task-editor');
    editorOptions.innerHTML = '';
    taskEditors.innerHTML = '';

    for (let i = 0; i < editors.length; i++) {
        const editorName = editors[i].name;
        editorOptions.innerHTML += `<option value="${editorName}" onclick="setEditor(${editorName})"></option>`;
        taskEditors.innerHTML += `<option value="${editorName}" onclick="setEditor(${editorName})"></option>`;
    }
}

function setEditor(name){
    currentEditor = `${name}`;
}

function createTask() {

    let title = document.getElementById('title-task');
    let priority = document.getElementById('priority-state-input');
    let category = document.getElementById('category-list-input');
    let editor = document.getElementById('task-editor-input');
    let status = document.getElementById('status-list-input');
    let description = document.getElementById('task-description');

    let task = {
        "title": title.value,
        "priority": priority.value,
        "category": category.value,
        "due-date": '',
        "editor": editor.value,
        "status": status.value,
        "description": description.value
    }

    tasks.push(task)

}

function openAddTask() {
    closeAllContent()
    document.getElementById('add-task').className = 'add-task'
    document.getElementById('add-task-h3').className = 'active-h3'
}

function openImpressum() {
    closeAllContent()
    document.getElementById('impressum').className = 'impressum'
    document.getElementById('impressum-h3').className = 'active-h3'
}

function openDatenschutz() {
    closeAllContent()
    document.getElementById('datenschutz').className = 'datenschutz'
    document.getElementById('datenschutz-h3').className = 'active-h3'
}


function closeAllContent() {
    document.getElementById('impressum').className = 'd-none'
    document.getElementById('datenschutz').className = 'd-none'
    document.getElementById('add-task').className = 'd-none'
    document.getElementById('board-h3').className = ''
    document.getElementById('backlog-h3').className = ''
    document.getElementById('add-task-h3').className = ''
    document.getElementById('help-h3').className = ''
    document.getElementById('impressum-h3').className = ''
    document.getElementById('datenschutz-h3').className = ''
}