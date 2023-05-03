import errorService from "../../exceptions/error.service.js";

export const chooseBoardResponse = (res, board) => {
  if (typeof board === "string") {
    if (board === "Not Found") {
      return res.status(404).json(errorService.setError(board));
    }
    return res.status(400).json(errorService.setError(board));
  }
  return res.json(board);
};
