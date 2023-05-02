import errorService from "../../exceptions/error.service.js";

export const chooseTaskResponse = (res, tasks) => {
  if (typeof tasks === "string") {
    if (tasks === "Not Found") {
      return res.status(404).json(errorService.setError(tasks));
    }
    return res.status(400).json(errorService.setError(tasks));
  }
  return res.json(tasks);
};
