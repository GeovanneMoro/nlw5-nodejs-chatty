import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateMessageDTO } from "../../../dtos/ICreateMessageDTO";
import { IMessagesRepository } from "../../../repositories/IMessagesRepository";
import { Message } from "../entities/Message";

@EntityRepository(Message)
class MessagesRepository implements IMessagesRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = getRepository(Message);
  }

  async findById(id: string): Promise<Message[]> {
    const message = await this.repository.find({
      where: { user_id: id },
      relations: ["user"],
    });

    return message;
  }

  async create(data: ICreateMessageDTO): Promise<Message> {
    const message = this.repository.create(data);

    await this.repository.save(message);

    return message;
  }
}

export { MessagesRepository };
