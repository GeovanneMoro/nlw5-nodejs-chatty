import { ICreateConnectionDTO } from "../dtos/ICreateConnectionDTO";
import { Connection } from "../infra/typeorm/entities/Connection";

interface IConnectionsRepository {
  create(date: ICreateConnectionDTO): Promise<Connection>;
}

export { IConnectionsRepository };
