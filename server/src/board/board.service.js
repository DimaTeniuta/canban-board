import boardModel from "./board.model.js";
import BoardDto from "./dto/board.dto.js";

class BoardService {
  async getAllBoards(userId) {
    const boards = await boardModel.find({ userId });
    return boards;
  }

  async getBoard(boardId) {
    const board = await boardModel.findOne({ _id: boardId });
    return board;
  }

  async createBoard(userId, title, description) {
    const board = await boardModel.create({ title, description, userId });
    const boardDto = new BoardDto(board);
    return {
      board: boardDto,
    };
  }

  async updateBoard(userId, boardId, body) {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }
    if (userId !== board.userId) {
      return "Bad request";
    }
    const { title, description } = body;
    await boardModel.updateOne({ _id: boardId }, { title, description });
    const res = await boardModel.findOne({ _id: boardId });
    const boardDto = new BoardDto(res);
    return {
      board: boardDto,
    };
  }

  async deleteBoard(userId, boardId) {
    const board = await boardModel.findById(boardId);
    if (!board) {
      return "Not Found";
    }
    if (userId !== board.userId) {
      return "Bad request";
    }
    await boardModel.deleteOne({ _id: boardId });
    return {
      message: 'success',
    };
  }
}

const boardService = new BoardService();
export default boardService;
