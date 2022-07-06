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

let temporaryArrayColor = [];





function showColor() {
    let content = document.getElementById('color-picker')
    content.classList.remove('d-none')
}


function takeColor(backgroundColor){
    temporaryArrayColor.push(backgroundColor)
}


function createTask() {

    let title = document.getElementById('title-task');
    let priority = document.getElementById('priority-state-input');
    let category = document.getElementById('category-list-input');
    let user = document.getElementById('task-user-input');
    let status = document.getElementById('status-list-input');
    let description = document.getElementById('task-description');
    let color = temporaryArrayColor[0]

    let task = {
        "title": title.value,
        "priority": priority.value,
        "category": category.value,
        "due-date": '',
        "user": user.value,
        "status": status.value,
        "description": description.value,
        "color": color //background color
    }

    tasks.push(task)
}