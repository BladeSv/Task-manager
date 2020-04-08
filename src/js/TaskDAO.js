import Task from "./Task";

export default class TaskDAO {

    addTask(task) {
        if (task) {
            let tasksOfStorage = window.localStorage.getItem(task.id);
            if (!tasksOfStorage) {
                window.localStorage.setItem(task.id, task);
                return true;
            }
        }
        return false;
    }


    removeTask(task_id) {
        if (task_id) {
            let tasksOfStorage = window.localStorage.getItem(task_id);
            if (tasksOfStorage) {
                window.localStorage.removeItem(task_id);
                return true;
            }
        }
        return false;
    }


    getTask(task_id) {
        if (task_id) {
            let tasksOfStorage = window.localStorage.getItem(task_id);
            if (tasksOfStorage) {
                return Task.fromJSON(tasksOfStorage);
            }
        }
        return null;
    }

    updateTask(task) {
        if (task) {
            let tasksOfStorage = window.localStorage.getItem(task.id);
            if (tasksOfStorage) {
                window.localStorage.setItem(task.id, task);
                return true;
            }
        }
        return false;
    }

    getAllTasks() {
        let tasks = [];
        for (let i = 0; i < window.localStorage.length; i++) {
            let key = window.localStorage.key(i);
            let taskJSON = window.localStorage.getItem(key);
            tasks.push(Task.fromJSON(taskJSON));
        }
        return tasks;
    }

    clear() {
        window.localStorage.clear();
    }
}