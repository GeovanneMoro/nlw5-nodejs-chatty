import { Router } from 'express';

import { settingsRoutes } from './seetings.routes';

const router = Router();

router.use('/settings', settingsRoutes);

export { router };
