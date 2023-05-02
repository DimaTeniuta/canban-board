export default class TaskUpdatedDto {
    title;
    description;
    order;
    _id;
    userId;
    boardId;
    columnId;
  
    constructor(model) {
      this.title = model.title;
      this.description = model.description;
      this.order = model.order;
      this._id = model._id;
      this.userId = model.userId;
      this.boardId = model.boardId;
      this.columnId = model.columnId;
    }
  }