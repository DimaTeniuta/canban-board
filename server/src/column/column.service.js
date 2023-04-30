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
    const columnsDto = columns.map((column) => new ColumnDto(column));
  
    return columnsDto;
  }

  async createColumn(userId, boardId, title) {
    const board = await boardModel.findById(boardId);
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
  
    return columnDto;
  }

  async updateColumn(userId, boardId, columnId, title) {
    const board = await boardModel.findOne({ _id: boardId });
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const column = await columnModel.findOneAndUpdate(
      { _id: columnId },
      { title }
    );
    const columnUpdated = await columnModel.findOne({ _id: columnId });
    if (!column) {
      return "Not Found";
    }
    return {
      column: columnUpdated,
    };
  }

  async updateColumnOrder(userId, boardId, oldOrder, newOrder) {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
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
    return {
      columns: savedColumns,
    };
  }

  async deleteColumn(userId, boardId, columnId) {
    const board = await boardModel.findOne({ _id: boardId });
    if (!board) {
      return "Not Found";
    }
    if (board.userId !== userId) {
      return "Bad request";
    }
    const column = await columnModel.findOneAndDelete({ _id: columnId });
    if (!column) {
      return "Not Found";
    }
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
      message: 'Success',
    };
  }
}

const columnService = new ColumnService();
export default columnService;
