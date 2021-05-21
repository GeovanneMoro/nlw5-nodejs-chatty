import { inject, injectable } from 'tsyringe';

import { ICreateSettingDTO } from '../../../../modules/seetings/dtos/ICreateSettingDTO';
import { Setting } from '../../../../modules/seetings/infra/typeorm/entities/Setting';
import { ISettingsRepository } from '../../repositories/ISettingsRepository';

@injectable()
class CreateSettingUseCase {
  constructor(
    @inject('SettingsRepository')
    private settingsRepository: ISettingsRepository,
  ) {}

  async execute({ username, chat }: ICreateSettingDTO): Promise<Setting> {
    const setting = await this.settingsRepository.create({ username, chat });

    return setting;
  }
}

export { CreateSettingUseCase };
