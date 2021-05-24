import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateConnectionDTO } from "../../../dtos/ICreateConnectionDTO";
import { IConnectionsRepository } from "../../../repositories/IConnectionsRepository";
import { Connection } from "../entities/Connection";

@EntityRepository(Connection)
class ConnectionsRepository implements IConnectionsRepository {
  private repository: Repository<Connection>;

  constructor() {
    this.repository = getRepository(Connection);
  }
  async create(date: ICreateConnectionDTO): Promise<Connection> {
    const connection = this.repository.create(date);

    await this.repository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string): Promise<Connection> {
    const connection = await this.repository.findOne({ where: { user_id } });

    return connection;
  }
}

export { ConnectionsRepository };
