


//Wir brauchen für den Bereich "editor" bei Add Task  ein Array mit allen Teilnehmern, die Zugang zu der Liste haben. Überschneidung mit Login
let editors = ['Martin', 'Stefan', 'Julia', 'Michael', 'Sahra'];


//Der aktuelle Bearbeiter wird über den Login definiert
let currentEditor;



// Login Funktionen

function loadEditors() {

    let editorOptions = document.getElementById('all-editors');
    let taskEditors = document.getElementById('task-editor');

    for (let i = 0; i < editors.length; i++) {
        const name = editors[i];
        editorOptions.innerHTML += `<option value="${name}" onclick="setEditor(${name})"></option>`;
        taskEditors.innerHTML += `<option value="${name}" onclick="setEditor(${name})"></option>`;
    }
}

function setEditor(name){
    currentEditor = `${name}`;
}

console.log(currentEditor)