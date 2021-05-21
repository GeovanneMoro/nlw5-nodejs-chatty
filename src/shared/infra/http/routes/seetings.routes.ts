import { Router } from 'express';
import { CreateSettingController } from '../../../../modules/seetings/useCases/createSetting/CreateSettingController';

const settingsRoutes = Router();

const createSettingController = new CreateSettingController();

settingsRoutes.post('/', createSettingController.handle);

export { settingsRoutes };
