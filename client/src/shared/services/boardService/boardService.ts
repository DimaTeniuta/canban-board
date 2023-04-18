import api from '../../api/api';

class BoardService {
  getAllBoards(): Promise<void> {
    return api.get('/boards');
  }

  getBoard(id: string): Promise<void> {
    return api.get(`/boards/${id}`);
  }

  createBoard(userId: string, title: string, description: string): Promise<void> {
    return api.post('/boards', { userId, title, description });
  }

  updateBoard(boardId: string, title: string, description: string): Promise<void> {
    return api.put(`/boards/${boardId}`, { title, description });
  }

  deleteBoard(boardId: string): Promise<void> {
    return api.delete(`/boards/${boardId}`);
  }
}

const boardService = new BoardService();

export default boardService;
