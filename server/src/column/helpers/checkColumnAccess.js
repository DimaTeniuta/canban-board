import boardModel from "../../board/board.model.js";
import columnModel from "../../column/column.model.js";

export const checkColumnAccess = async (userId, boardId, columnId = null) => {
  const board = await boardModel.findById(boardId);
  if (!board) {
    return "Not Found";
  }

  if (board.userId !== userId) {
    return "Bad request";
  }

  if (columnId) {
    const column = await columnModel.findById(columnId);
    if (!column) {
      return "Not Found";
    }
    
    if (column.userId !== userId) {
      return "Bad request";
    }
  }
};
