import { Router } from "express";

import { CreateSettingController } from "../../../../modules/seetings/useCases/createSetting/CreateSettingController";
import { ListSettingController } from "../../../../modules/seetings/useCases/listSetting/ListSettingController";
import { UpdateSettingController } from "../../../../modules/seetings/useCases/updateSetting/UpdateSettingController";

const settingsRoutes = Router();

const createSettingController = new CreateSettingController();
const listSettingControler = new ListSettingController();
const updateSettingController = new UpdateSettingController();

settingsRoutes.post("/", createSettingController.handle);
settingsRoutes.get("/:username", listSettingControler.handle);
settingsRoutes.put("/:username", updateSettingController.handle);

export { settingsRoutes };
