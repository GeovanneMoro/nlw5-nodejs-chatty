import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMessageByUserUseCase } from "./ListMessageByUserUseCase";

class ListMessageByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listMessageByUserUseCase = container.resolve(
      ListMessageByUserUseCase
    );

    const messages = await listMessageByUserUseCase.execute(user_id);

    return response.json(messages);
  }
}

export { ListMessageByUserController };
