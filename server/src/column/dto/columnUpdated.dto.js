export default class ColumnUpdatedDto {
    title;
    order;
    _id;
    userId;
    boardId;
  
    constructor(model) {
      this.title = model.title;
      this.order = model.order;
      this._id = model._id;
      this.userId = model.userId;
      this.boardId = model.boardId;
    }
  }