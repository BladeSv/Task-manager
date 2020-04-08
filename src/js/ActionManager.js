export default class ActionManager {
    constructor(elem, service) {
        this.elem = elem;
        this.service = service;
        elem.addEventListener("click", this.onClick.bind(this));
    }

    add() {
        this.service.openAddModal();
    }

    closeModal() {
        this.service.closeModal();
    }

    addTask() {
        this.service.addTask();

    }

    update(target) {
        this.service.openUpdateModal(target);
    }

    updateTask(target) {
        this.service.updateTask(target);
    }

    check(target) {
        this.service.checkTask(target);
    }

    clearAll() {
        this.service.openDeleteAllItemsModal();
    }

    clearAllTasks() {
        this.service.clearTaskList();

    }

    delete(target) {
        this.service.openDeleteItemModal(target);
    }

    deleteTask(target) {
        this.service.deleteTask(target);
    }

    onClick(event) {
        let action = event.target.dataset.buttonAction;
        if (action) {
            this[action](event.target);
        }
    }
}