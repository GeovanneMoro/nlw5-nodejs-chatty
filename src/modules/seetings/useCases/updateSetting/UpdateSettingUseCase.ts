import { inject, injectable } from "tsyringe";

import { Setting } from "../../infra/typeorm/entities/Setting";
import { ISettingsRepository } from "../../repositories/ISettingsRepository";

interface IRequest {
  username: string;
  chat: boolean;
}

@injectable()
class UpdateSettingUseCase {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}
  async execute({ username, chat }: IRequest): Promise<Setting> {
    const setting = await this.settingsRepository.updateByUsername({
      username,
      chat,
    });

    return setting;
  }
}

export { UpdateSettingUseCase };
