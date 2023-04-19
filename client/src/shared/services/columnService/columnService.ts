import api from '../../api/api';

class ColumnService {
  getColumns(boardId: string): Promise<void> {
    return api.get(`/boards/${boardId}/columns`);
  }

  createColumn(boardId: string, title: string): Promise<void> {
    return api.post(`/boards/${boardId}/columns`, { title });
  }

  updateColumn(boardId: string, columnId: string, title: string): Promise<void> {
    return api.put(`/boards/${boardId}/columns/${columnId}`, { title });
  }

  deleteColumn(boardId: string, columnId: string): Promise<void> {
    return api.delete(`/boards/${boardId}/columns/${columnId}`);
  }
}

const columnService = new ColumnService();

export default columnService;
