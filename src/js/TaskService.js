import TaskDAO from "./TaskDAO.js"
import TaskRender from "./TaskRender.js"
import ActionManager from "./ActionManager.js"
import ModalFrame from "./ModalFrame.js"
import Task from "./Task.js";

export default class TaskService {

    constructor() {
        this.taskRender = new TaskRender();
        this.taskDAO = new TaskDAO();
        this.modalFrame = new ModalFrame();
    }

    start() {
        this.actionManager = new ActionManager(document.body, this);
        this.taskDAO.clear();
        this.drawAllTasks();
    }

    drawAllTasks() {
        let tasksHomeElement = document.getElementById("tasks");
        let tasks = this.taskDAO.getAllTasks();
        tasks.sort((a, b) => a.id - b.id);
        let renderedTasks = this.taskRender.renderTasks(tasks);
        document.querySelectorAll(".task").forEach((x) => x.remove());
        tasksHomeElement.insertAdjacentHTML("afterbegin", renderedTasks);
    }

    openUpdateModal(target) {
        let taskElem = target.closest(".task");
        let task_id = taskElem.id;
        let task = this.taskDAO.getTask(task_id);
        this.modalFrame.openUpdateModal(task);
    }

    updateTask(target) {
        let elem = document.getElementById("messageText");
        let text = elem.value;
        let task_id = target.dataset.taskId;
        let task = this.taskDAO.getTask(task_id);
        task.text = text;
        this.taskDAO.updateTask(task);
        this.drawAllTasks();
        this.modalFrame.close();
    }

    checkTask(target) {
        let taskElem = target.closest(".task");
        let task_id = taskElem.id;
        let task = this.taskDAO.getTask(task_id);
        task.isCheck = target.checked;
        this.taskDAO.updateTask(task);
        this.drawAllTasks();
        this.modalFrame.close();
    }

    openAddModal() {
        this.modalFrame.openAddModal();
    }

    closeModal() {
        this.modalFrame.close();
    }

    openDeleteAllItemsModal() {
        this.modalFrame.openDeleteAllItems();
    }

    openDeleteItemModal(target) {
        let task = target.closest(".task");
        let task_id = task.id;
        this.modalFrame.openDeleteItem(task_id);
    }

    addTask() {
        let elem = document.getElementById("messageText");
        let text = elem.value;
        let task = new Task(text, false);
        this.taskDAO.addTask(task);
        this.drawAllTasks();
        this.modalFrame.close();
    }

    deleteTask(target) {
        console.log();
        let task_id = target.dataset.taskId;
        this.taskDAO.removeTask(task_id);
        this.modalFrame.close();
        this.drawAllTasks();
    }


    clearTaskList() {
        this.taskDAO.clear();
        this.modalFrame.close();
        this.drawAllTasks();
    }

}