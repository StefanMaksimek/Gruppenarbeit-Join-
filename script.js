


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


//Der aktuelle Bearbeiter wird über den Login definiert
let currentEditor;



// Login Funktionen


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
/** Auswahl der Bearbeiter */
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

console.log(currentEditor)