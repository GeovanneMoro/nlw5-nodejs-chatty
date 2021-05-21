import { container } from 'tsyringe';

import { SettingsRepository } from '../../modules/seetings/infra/typeorm/repositories/SettingsRepository';
import { ISettingsRepository } from '../../modules/seetings/repositories/ISettingsRepository';

container.registerSingleton<ISettingsRepository>(
  'SettingsRepository',
  SettingsRepository,
);
