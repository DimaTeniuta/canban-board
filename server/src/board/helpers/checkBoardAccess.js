import boardModel from "../board.model.js";

export const checkBoardAccess = async (userId, boardId) => {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }

    if (board.userId !== userId) {
      return "Bad request";
    }
}