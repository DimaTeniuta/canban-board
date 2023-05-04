## REST service docs
---
### Endpoints:
- `Auth` (`/`route)
    - `POST /registration` - new user registration
    - `POST /login` - user authorization
    - `POST /logout` - user logout
    - `GET /refresh` - refresh token


- `User` (`users/` route)
    - `GET /:userId` - get the user by id(ex. “/users/123”)
    - `PUT /:userId` - update user
    - `DELETE /:userId` - delete user


- `Board` (`boards/` route)
    - `GET /` - get all user boards
    - `GET /:boardId` - get board by id
    - `POST /:boardId` - create board
    - `PUT /:boardId` - update board
    - `DELETE /:boardId` - delete board


- `Column` (`boards/:boardId/columns/` route)
    - `GET /` - get all user columns
    - `POST /` - create column
    - `PUT /:columnId` - update column
    - `PUT /order/set` - update column order
    - `DELETE /:columnId` - update column


- `Task` (`boards/:boardId/columns/:columnId/tasks` route)
    - `GET /` - get all user tasks
    - `GET /:taskId` - get task by id
    - `POST /` - create task
    - `PUT /:taskId` - update task
    - `PUT /order/set` - update task order in column
    - `DELETE /:taskId` - delete task


- `Task column order` (`boards/:boardId/columns/` route)
    - `PUT /:columnOldId/:columnNewId/tasks/order/set` - update task column

