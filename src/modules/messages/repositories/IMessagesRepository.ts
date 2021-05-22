import { ICreateMessageDTO } from "../dtos/ICreateMessageDTO";
import { Message } from "../infra/typeorm/entities/Message";

interface IMessagesRepository {
  findById(id: string): Promise<Message[]>;
  create(data: ICreateMessageDTO): Promise<Message>;
}

export { IMessagesRepository };
