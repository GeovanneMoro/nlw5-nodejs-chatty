import { ICreateSettingDTO } from '../../../dtos/ICreateSettingDTO';
import { EntityRepository, getRepository, Repository } from 'typeorm';

import { ISettingsRepository } from '../../../repositories/ISettingsRepository';
import { Setting } from '../entities/Setting';

@EntityRepository(Setting)
class SettingsRepository implements ISettingsRepository {
  private repository: Repository<Setting>;

  constructor() {
    this.repository = getRepository(Setting);
  }

  async create({ username, chat = true }: ICreateSettingDTO): Promise<Setting> {
    const newSetting = this.repository.create({ username, chat });

    const setting = await this.repository.save(newSetting);

    return setting;
  }
}

export { SettingsRepository };
