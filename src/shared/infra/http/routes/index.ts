import { Router } from "express";

import { messagesRoutes } from "./messages.routes";
import { settingsRoutes } from "./seetings.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/settings", settingsRoutes);
router.use("/users", usersRoutes);
router.use("/messages", messagesRoutes);

export { router };
