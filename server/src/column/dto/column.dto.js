export default class ColumnDto {
  title;
  order;
  id;
  userId;
  boardId;

  constructor(model) {
    this.title = model.title;
    this.order = model.order;
    this.id = model._id;
    this.userId = model.userId;
    this.boardId = model.boardId;
  }
}
