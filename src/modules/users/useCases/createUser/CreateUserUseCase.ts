import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUserRepository
  ) {}

  async execute(email: string): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      return userAlreadyExists;
    }
    const user = await this.usersRepository.create({ email });

    return user;
  }
}

export { CreateUserUseCase };
