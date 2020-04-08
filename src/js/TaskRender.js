export default class TaskResder {

    renderTasks(tasks) {
        if (tasks && Array.isArray(tasks)) {
            let renderedTasks = "";
            for (let task of tasks) {
                renderedTasks += this.drawTask(task) + "\n";
            }
            return renderedTasks;
        }

    }

    drawTask(task) {
        if (task) {
            let taskTemlate = `<div id="${task.id}" class="task">
            <input type="checkbox" data-button-action="check" title="Check it if task is done"" ${(task.isCheck)? "checked": ""}>
            <input type="text" size="40" disabled value="${task.text}">
            <button class="task-button" data-button-action="update" title="Edit task"></button>
            <button class="task-button" data-button-action="delete" title="Delete task"></button>
         </div>`;
            return taskTemlate;
        }
    }
}