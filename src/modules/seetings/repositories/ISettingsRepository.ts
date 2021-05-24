import { ICreateSettingDTO } from "../dtos/ICreateSettingDTO";
import { Setting } from "../infra/typeorm/entities/Setting";

interface ISettingsRepository {
  findByUsername(username: string): Promise<Setting>;
  create(data: ICreateSettingDTO): Promise<Setting>;
  updateByUsername(data: ICreateSettingDTO): Promise<Setting>;
}

export { ISettingsRepository };
