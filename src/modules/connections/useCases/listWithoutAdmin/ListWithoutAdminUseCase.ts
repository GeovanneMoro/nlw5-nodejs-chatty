import { Connection } from "modules/connections/infra/typeorm/entities/Connection";
import { inject, injectable } from "tsyringe";

import { IConnectionsRepository } from "../../repositories/IConnectionsRepository";

@injectable()
class ListWithoutAdminUseCase {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute(): Promise<Connection[]> {
    const withoutAdmin = await this.connectionsRepository.findAllWithoutAdmin();

    return withoutAdmin;
  }
}

export { ListWithoutAdminUseCase };
