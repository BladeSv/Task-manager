export default class ModalFrame {

    constructor() {
        this.modal;
    }

    create(option) {
        let modalElem = document.createElement("div");
        modalElem.classList.add("modal");
        modalElem.insertAdjacentHTML("afterbegin", `
    <div class="modal-overlay">
        <div class="message-box">
            <div class="cancel-button-box">
                <button class="task-button" data-button-action="closeModal">&times;</button>
            </div>
            <div class="message-box-main">
                <div class=" message-box-text ">
            ${option.body}
                </div>
                <div class="message-box-buttons ">
                ${option.button}
                    <button class="message-button" data-button-action="closeModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>  
    `);
        document.body.append(modalElem);
        this.modal = modalElem;
    }


    openAddModal() {
        let option = {
            body: "<p>Enter task message</p><input id='messageText' type='text'>",
            button: "<button class='message-button' data-button-action='addTask'>Ok</button>"
        }
        this.create(option);
        this.open();
    }

    openUpdateModal(task) {
        let option = {
            body: `<p>Enter new task message</p><input id='messageText' type='text' value="${task.text}">`,
            button: `<button class='message-button' data-button-action='updateTask' data-task-id="${task.id}">Ok</button>`
        }
        this.create(option);
        this.open();
    }



    openDeleteAllItems() {
        let option = {
            body: "<p>Do you really want to delete all tasks?</p>",
            button: "<button class='message-button' data-button-action='clearAllTasks'>Delete</button>"
        }
        this.create(option);
        this.open();

    }

    openDeleteItem(task_id) {
        let option = {
            body: "<p>Do you really want to delete this tasks</p>",
            button: `<button class='message-button' data-button-action='deleteTask' data-task-id='${task_id}'>Delete</button>`
        }
        this.create(option);
        this.open();

    }

    open() {
        this.modal.classList.add("open");
    }
    close() {
        this.modal.classList.remove("open");
        this.destroy();
    }
    destroy() {
        document.querySelector(".modal").remove();
    }
}