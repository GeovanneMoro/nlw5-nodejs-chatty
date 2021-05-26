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

  async findAllWithoutAdmin(): Promise<Connection[]> {
    const allWithoutAdmin = await this.repository.find({
      where: { admin_id: null },
      relations: ["user"],
    });

    return allWithoutAdmin;
  }

  async findBySocketId(socket_id: string): Promise<Connection> {
    const connection = await this.repository.findOne({ socket_id });

    return connection;
  }

  async updateAdminId(user_id: string, admin_id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where("user_id = :user_id", {
        user_id,
      })
      .execute();
  }

  async deleteBySocketId(socket_id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where("socket_id = :socket_id", {
        socket_id,
      })
      .execute();
  }
}

export { ConnectionsRepository };
