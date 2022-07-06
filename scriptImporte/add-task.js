let tasks = [
    {
        "title": 'Design of Concept',
        "priority": 'high',
        "category": 'IT',
        "due-date": '',
        "user": 'Martin',
        "status": 'ToDo',
        "description": 'create some ideas how we can resolve the problem of the responsible design and the arrangement of the object of the side'
    }
];

let temporaryArrayColor = ['lightblue'];


function showColor() {
    let content = document.getElementById('color-picker')

    if (colorOptionsAreHiding(content)) {
        content.classList.remove('d-none')
    }
    else {
        content.classList.add('d-none')
    }
}


function colorOptionsAreHiding(content){
    return content.classList.contains('d-none');
}


function changeButtonColorOfColorPicker(color) {
    let button = document.getElementById('add-task-color-button')
    button.style = (`background-color: ${color}`)
}


function takeColor(color) {
    temporaryArrayColor.length = 0; // clear temporaryArray
    temporaryArrayColor.push(color);
    showColor();
    changeButtonColorOfColorPicker(color)
}


function createTask() {

    let title = document.getElementById('title-task');
    let priority = document.getElementById('priority-state-input');
    let category = document.getElementById('category-list-input');
    let user = document.getElementById('task-user-input');
    let status = document.getElementById('status-list-input');
    let description = document.getElementById('task-description');
    let dueDate = document.getElementById('due-date')
    let color = temporaryArrayColor[0]

    let task = {
        "title": title.value,
        "priority": priority.value,
        "category": category.value,
        "due-date": dueDate.value,
        "user": user.value,
        "status": status.value,
        "description": description.value,
        "color": color
    }
    checkInputValueOfAddTask(task)
}


function checkInputValueOfAddTask(task) {
    if (lengthOfTitle() < 1) {
        alert('please write some title')
    }
    else {
        tasks.push(task)
        clearTaskInputfields()
    }
}


function lengthOfTitle(){
    return document.getElementById('title-task').value.length;
}


function clearTaskInputfields() {
    document.getElementById('title-task').value = '';
    document.getElementById('priority-state-input').value = 'Priority...';
    document.getElementById('category-list-input').value = 'Category...';
    document.getElementById('task-user-input').value = '';
    document.getElementById('status-list-input').value = 'Status...';
    document.getElementById('task-description').value = '...';
    document.getElementById('due-date').value = '';
    setTemporaryArrayColorToStandard();
    clearColorofButtonForColorSelection()
}

function setTemporaryArrayColorToStandard(){
    let color = 'lightblue'; // if no color is selected, lightblue wil be pushed
    temporaryArrayColor[0] = color;
}

function clearColorofButtonForColorSelection(){
    document.getElementById('add-task-color-button').style.backgroundColor = null;
}