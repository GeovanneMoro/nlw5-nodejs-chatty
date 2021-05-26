import { ICreateConnectionDTO } from "../dtos/ICreateConnectionDTO";
import { Connection } from "../infra/typeorm/entities/Connection";

interface IConnectionsRepository {
  create(date: ICreateConnectionDTO): Promise<Connection>;
  findByUserId(user_id: string): Promise<Connection>;
  findBySocketId(user_id: string): Promise<Connection>;
  findAllWithoutAdmin(): Promise<Connection[]>;
  updateAdminId(user_id: string, admin_id: string): Promise<void>;
  deleteBySocketId(socket_id: string): Promise<void>;
}

export { IConnectionsRepository };
