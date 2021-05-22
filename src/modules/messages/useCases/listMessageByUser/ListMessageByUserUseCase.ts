import { inject, injectable } from "tsyringe";

import { Message } from "../../infra/typeorm/entities/Message";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";

@injectable()
class ListMessageByUserUseCase {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  async execute(id: string): Promise<Message[]> {
    const messages = await this.messagesRepository.findById(id);

    return messages;
  }
}

export { ListMessageByUserUseCase };
