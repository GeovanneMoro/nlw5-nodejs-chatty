import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateSettingDTO } from "../../../dtos/ICreateSettingDTO";
import { ISettingsRepository } from "../../../repositories/ISettingsRepository";
import { Setting } from "../entities/Setting";

@EntityRepository(Setting)
class SettingsRepository implements ISettingsRepository {
  private repository: Repository<Setting>;

  constructor() {
    this.repository = getRepository(Setting);
  }

  async findByUsername(username: string): Promise<Setting> {
    const setting = await this.repository.findOne({ username });

    return setting;
  }

  async create({ username, chat = true }: ICreateSettingDTO): Promise<Setting> {
    const newSetting = this.repository.create({ username, chat });

    const setting = await this.repository.save(newSetting);

    return setting;
  }

  async updateByUsername({
    username,
    chat,
  }: ICreateSettingDTO): Promise<Setting> {
    const setting = await this.repository.findOne({ username });

    setting.chat = chat;

    await this.repository.save(setting);

    return setting;
  }
}

export { SettingsRepository };
