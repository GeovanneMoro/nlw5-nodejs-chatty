import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListWithoutAdminUseCase } from "./ListWithoutAdminUseCase";

class ListWithoutAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listWithoutAdminUseCase = container.resolve(ListWithoutAdminUseCase);

    const allWithoutAdmin = await listWithoutAdminUseCase.execute();

    return response.json(allWithoutAdmin);
  }
}

export { ListWithoutAdminController };
