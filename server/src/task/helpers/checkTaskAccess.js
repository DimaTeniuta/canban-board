import boardModel from "../../board/board.model.js";
import columnModel from "../../column/column.model.js";

export const checkTaskAccess = async (boardId, columnId, userId) => {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }

    if (board.userId !== userId) {
      return "Bad request";
    }
    
    const column = await columnModel.findById(columnId);
    if (!column) {
      return "Bad request";
    }

    if (column.userId !== userId) {
      return "Bad request";
    }

    if (column.boardId !== boardId) {
      return "Bad request";
    }
}