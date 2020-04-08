export default class Task {

    constructor(text, isCheck, id) {
        this.text = text;
        this.isCheck = isCheck;
        (id) ? this.id = id: this.id = Date.now();
    }

    static fromJSON(json) {
        let taskJSON = JSON.parse(json);
        return new Task(taskJSON.text, taskJSON.isCheck, taskJSON.id);
    }

    toString() {
        return JSON.stringify(this);
    }
}