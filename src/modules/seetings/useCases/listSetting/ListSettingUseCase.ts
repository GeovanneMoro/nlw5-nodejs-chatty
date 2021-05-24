import { inject, injectable } from "tsyringe";

import { Setting } from "../../infra/typeorm/entities/Setting";
import { ISettingsRepository } from "../../repositories/ISettingsRepository";

@injectable()
class ListSettingUseCase {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}
  async execute(username: string): Promise<Setting> {
    const setting = await this.settingsRepository.findByUsername(username);

    return setting;
  }
}

export { ListSettingUseCase };
