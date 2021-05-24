import { container } from "tsyringe";

import { ConnectionsRepository } from "../../modules/connections/infra/typeorm/repositories/ConnectionsRepository";
import { IConnectionsRepository } from "../../modules/connections/repositories/IConnectionsRepository";
import { MessagesRepository } from "../../modules/messages/infra/typeorm/repositories/MessagesRepository";
import { IMessagesRepository } from "../../modules/messages/repositories/IMessagesRepository";
import { SettingsRepository } from "../../modules/seetings/infra/typeorm/repositories/SettingsRepository";
import { ISettingsRepository } from "../../modules/seetings/repositories/ISettingsRepository";
import { UsersRepository } from "../../modules/users/infra/typeorm/repositories/UsersRepository";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";

container.registerSingleton<ISettingsRepository>(
  "SettingsRepository",
  SettingsRepository
);

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IMessagesRepository>(
  "MessagesRepository",
  MessagesRepository
);

container.registerSingleton<IConnectionsRepository>(
  "ConnectionsRepository",
  ConnectionsRepository
);
