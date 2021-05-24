/* eslint-disable prefer-const */
import { container } from "tsyringe";

import { ConnectionsRepository } from "../../../../modules/connections/infra/typeorm/repositories/ConnectionsRepository";
import { MessagesRepository } from "../../../../modules/messages/infra/typeorm/repositories/MessagesRepository";
import { UsersRepository } from "../../../../modules/users/infra/typeorm/repositories/UsersRepository";
import { io } from "../app";

interface IParams {
  text: string;
  email: string;
}

io.on("connect", (socket) => {
  const connectionsRepository = container.resolve(ConnectionsRepository);
  const usersRepository = container.resolve(UsersRepository);
  const messagesRepository = container.resolve(MessagesRepository);

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    const userExists = await usersRepository.findByEmail(email);
    let user_id = null;

    if (!userExists) {
      const user = await usersRepository.create({ email });
      await connectionsRepository.create({ socket_id, user_id: user.id });
      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connectionExists = await connectionsRepository.findByUserId(
        userExists.id
      );

      if (!connectionExists) {
        // salvar a conexão com o socket_id, user_id
        await connectionsRepository.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connectionExists.socket_id = socket_id;
        await connectionsRepository.create(connectionExists);
      }
    }

    await messagesRepository.create({ text, user_id });
  });
});
