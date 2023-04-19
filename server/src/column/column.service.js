import boardModel from "../board/board.model.js";
import columnModel from "./column.model.js";
import ColumnDto from "./dto/column.dto.js";

class ColumnService {
  async getColumns(userId, boardId) {
    const board = await boardModel.findOne({ _id: boardId });
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const columns = await columnModel.find({ boardId });
    if (!columns) {
      return "Bad request";
    }
    return {
      column: columns,
    };
  }

  async createColumn(userId, boardId, title) {
    const board = await boardModel.findOne({ _id: boardId });
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const columns = await columnModel.find({ boardId });
    if (!columns) {
      return "Bad request";
    }
    const order = columns.length;
    const column = await columnModel.create({ title, order, userId, boardId });
    const columnDto = new ColumnDto(column);
    return {
      column: columnDto,
    };
  }

  async updateColumn(userId, boardId, columnId, title) {
    const board = await boardModel.findOne({ _id: boardId });
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const column = await columnModel.findOneAndUpdate({ _id: columnId }, { title });
    const columnUpdated = await columnModel.findOne({ _id: columnId });
    if (!column) {
      return "Not Found";
    }
    return {
      column: columnUpdated,
    };
  }
}

const columnService = new ColumnService();
export default columnService;
