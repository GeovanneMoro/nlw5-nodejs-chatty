import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSettingUseCase } from './CreateSettingUseCase';

class CreateSettingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body;

    const createSettingUseCase = container.resolve(CreateSettingUseCase);

    const setting = await createSettingUseCase.execute({ username, chat });

    return response.json(setting);
  }
}

export { CreateSettingController };
