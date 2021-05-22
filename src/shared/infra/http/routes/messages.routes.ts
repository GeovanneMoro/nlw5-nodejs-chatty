import { Router } from "express";

import { CreateMessageController } from "../../../../modules/messages/useCases/createMessage/CreateMessageController";
import { ListMessageByUserController } from "../../../../modules/messages/useCases/listMessageByUser/ListMessageByUserController";

const messagesRoutes = Router();

const listMessagesByUserController = new ListMessageByUserController();
const createMessageController = new CreateMessageController();

messagesRoutes.get("/:user_id", listMessagesByUserController.handle);
messagesRoutes.post("/", createMessageController.handle);

export { messagesRoutes };
