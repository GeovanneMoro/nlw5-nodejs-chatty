import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSettingUseCase } from "./ListSettingUseCase";

class ListSettingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const listSettingsUseCase = container.resolve(ListSettingUseCase);

    const setting = await listSettingsUseCase.execute(username);

    return response.json(setting);
  }
}

export { ListSettingController };
