import boardModel from "../board/board.model.js";
import columnModel from "./column.model.js";
import ColumnDto from "./dto/column.dto.js";
import { checkColumnAccess } from "./helpers/checkColumnAccess.js";

class ColumnService {
  async getColumns(userId, boardId) {
    const columnAccess = await checkColumnAccess(userId, boardId);
    if (columnAccess) {
      return columnAccess;
    }

    const columns = await columnModel.find({ boardId });
    const columnsDto = columns
      .sort((a, b) => a.order - b.order)
      .map((column) => new ColumnDto(column));

    return columnsDto;
  }

  async createColumn(userId, boardId, title) {
    const columnAccess = await checkColumnAccess(userId, boardId);
    if (columnAccess) {
      return columnAccess;
    }
  
    const columns = await columnModel.find({ boardId });
    if (!columns) {
      return "Bad request";
    }
    const order = columns.length;
    const column = await columnModel.create({ title, order, userId, boardId });
    const columnDto = new ColumnDto(column);

    return columnDto;
  }

  async updateColumn(userId, boardId, columnId, title) {
    const columnAccess = await checkColumnAccess(userId, boardId, columnId);
    if (columnAccess) {
      return columnAccess;
    }

    await columnModel.findOneAndUpdate({ _id: columnId }, { title });

    const columnUpdated = await columnModel.findOne({ _id: columnId });
    const columnDto = new ColumnDto(columnUpdated);

    return columnDto;
  }

  async updateColumnOrder(userId, boardId, oldOrder, newOrder) {
    const columnAccess = await checkColumnAccess(userId, boardId);
    if (columnAccess) {
      return columnAccess;
    }

    const oldColumns = await columnModel.find({ boardId });
    const newColumns = oldColumns
      .sort((a, b) => a.order - b.order)
      .map((column, index) => {
        const { _id, userId, boardId, title, order } = column;
        const tmpColumn = { _id, userId, boardId, title, order };
        if (oldOrder < newOrder) {
          if (index === oldOrder) {
            return { ...tmpColumn, order: newOrder };
          } else if (index === newOrder) {
            return { ...tmpColumn, order: column.order - 1 };
          } else if (index < newOrder && index > oldOrder) {
            return { ...tmpColumn, order: column.order - 1 };
          } else {
            return column;
          }
        } else if (oldOrder > newOrder) {
          if (index === oldOrder) {
            return { ...tmpColumn, order: newOrder };
          } else if (index === newOrder) {
            return { ...tmpColumn, order: column.order + 1 };
          } else if (index > newOrder && index < oldOrder) {
            return { ...tmpColumn, order: column.order + 1 };
          } else {
            return column;
          }
        }
      });

    await Promise.all(
      newColumns.map((el) => {
        return new Promise((res) =>
          res(
            columnModel.findOneAndUpdate({ _id: el._id }, { order: el.order })
          )
        );
      })
    );

    const savedColumns = await columnModel.find({ boardId });
    const savedColumnsDto = savedColumns.map((column) => new ColumnDto(column));

    return savedColumnsDto;
  }

  async deleteColumn(userId, boardId, columnId) {
    const columnAccess = await checkColumnAccess(userId, boardId, columnId);
    if (columnAccess) {
      return columnAccess;
    }

    await columnModel.findOneAndDelete({ _id: columnId });

    const oldColumns = await columnModel.find({ boardId });
    const newColumns = oldColumns
      .sort((a, b) => a.order - b.order)
      .map((column, index) => {
        const { _id, order } = column;
        const tmpColumn = { _id, order };
        return { ...tmpColumn, order: index };
      });

    await Promise.all(
      newColumns.map((el) => {
        return new Promise((res) =>
          res(
            columnModel.findOneAndUpdate({ _id: el._id }, { order: el.order })
          )
        );
      })
    );

    return {
      message: "Success",
    };
  }
}

const columnService = new ColumnService();
export default columnService;
