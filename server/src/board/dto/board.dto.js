export default class BoardDto {
    title;
    description;
    id;
    userId;
    columns;

    constructor(model) {
        this.title = model.title;
        this.description = model.description;
        this.id = model._id;
        this.userId = model.userId;
        this.columns = model.columns;
    }
}