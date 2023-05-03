import columnModel from "../column/column.model.js";
import taskModel from "../task/task.model.js";
import boardModel from "./board.model.js";
import BoardDto from "./dto/board.dto.js";
import { checkBoardAccess } from "./helpers/checkBoardAccess.js";

class BoardService {
  async getAllBoards(userId) {
    const boards = await boardModel.find({ userId });
    if (!boards) {
      return "Not Found";
    }

    const boardsDto = boards.map((board) => new BoardDto(board));
    return boardsDto;
  }

  async getBoard(userId, boardId) {
    const boarAccess = await checkBoardAccess(userId, boardId)
    if (boarAccess) {
      return boarAccess;
    }

    const board = await boardModel.findById(boardId);

    const boardDto = new BoardDto(board);
    return boardDto;
  }

  async createBoard(userId, title, description) {
    const board = await boardModel.create({ title, description, userId });
    const boardDto = new BoardDto(board);

    return boardDto;
  }

  async updateBoard(userId, boardId, body) {
    const boarAccess = await checkBoardAccess(userId, boardId)
    if (boarAccess) {
      return boarAccess;
    }

    const { title, description } = body;
    const updatedBoard = await boardModel.updateOne({ _id: boardId }, { title, description });
    if (!updatedBoard) {
      return 'Not Found';
    }

    const res = await boardModel.findOne({ _id: boardId });
    const boardDto = new BoardDto(res);
    return boardDto;
  }

  async deleteBoard(userId, boardId) {
    const boarAccess = await checkBoardAccess(userId, boardId)
    if (boarAccess) {
      return boarAccess;
    }

    await boardModel.deleteOne({ _id: boardId });
    await columnModel.deleteMany({ boardId: boardId });
    await taskModel.deleteMany({ boardId: boardId });

    return {
      message: "success",
    };
  }
}

const boardService = new BoardService();
export default boardService;
