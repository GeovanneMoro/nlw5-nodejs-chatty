import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateSettingDTO } from "../../dtos/ICreateSettingDTO";
import { Setting } from "../../infra/typeorm/entities/Setting";
import { ISettingsRepository } from "../../repositories/ISettingsRepository";

@injectable()
class CreateSettingUseCase {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}

  async execute({ username, chat }: ICreateSettingDTO): Promise<Setting> {
    const userAlreadyExists = await this.settingsRepository.findByUsername(
      username
    );

    if (userAlreadyExists) {
      throw new AppError("User already exists!", 400);
    }

    const setting = await this.settingsRepository.create({ username, chat });

    return setting;
  }
}

export { CreateSettingUseCase };
