import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../../users/repositories/IUserRepository";
import { ICreateMessageDTO } from "../../dtos/ICreateMessageDTO";
import { Message } from "../../infra/typeorm/entities/Message";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";

interface IRequest {
  admin_id?: string;
  text: string;
  user_id: string;
}

@injectable()
class CreateMessageUseCase {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
    @inject("UsersRepository") private usersRepository: IUserRepository
  ) {}

  async execute({ admin_id, text, user_id }: IRequest): Promise<Message> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User does not exists");
    }

    const message = await this.messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    return message;
  }
}

export { CreateMessageUseCase };
