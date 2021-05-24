import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateSettingUseCase } from "./UpdateSettingUseCase";

class UpdateSettingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { chat } = request.body;
    const updateSettingUseCase = container.resolve(UpdateSettingUseCase);

    const setting = await updateSettingUseCase.execute({ username, chat });

    return response.json(setting);
  }
}

export { UpdateSettingController };
