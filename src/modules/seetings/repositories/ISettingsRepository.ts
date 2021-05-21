import { ICreateSettingDTO } from '../dtos/ICreateSettingDTO';
import { Setting } from '../infra/typeorm/entities/Setting';

interface ISettingsRepository {
  create(data: ICreateSettingDTO): Promise<Setting>;
}

export { ISettingsRepository };
