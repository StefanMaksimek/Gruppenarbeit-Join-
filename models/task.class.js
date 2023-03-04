class Task {
    id; // string
    title; // string
    priority; // string
    category; // string
    createdAt; // timestamp
    dueDate; // timestamp
    user; // array of user objects
    status; // string / to-do / in-progress / testing / done
    description; // string
    color; // string
    locationTask; // string; where the task is rendered / backlog / board

    constructor (taskInfo) {
        this.id = taskInfo.id;
        this.title = taskInfo.title;
        this.priority = taskInfo.priority;
        this.category = taskInfo.category;
        this.createdAt = taskInfo.createdAt;
        this.dueDate = taskInfo.dueDate;
        this.user = taskInfo.user;
        this.status = taskInfo.status;
        this.description = taskInfo.description;
        this.color = taskInfo.color;
        this.locationTask = taskInfo.locationTask;
    }
}