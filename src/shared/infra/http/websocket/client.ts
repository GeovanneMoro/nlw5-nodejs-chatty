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
    let user_id = null;

    const userExists = await usersRepository.findByEmail(email);

    if (!userExists) {
      const user = await usersRepository.create({ email });

      await connectionsRepository.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;

      const connection = await connectionsRepository.findByUserId(
        userExists.id
      );

      if (!connection) {
        await connectionsRepository.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;

        await connectionsRepository.create(connection);
      }
    }

    await messagesRepository.create({
      text,
      user_id,
    });

    const allMessages = await messagesRepository.findById(user_id);
    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionsRepository.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await connectionsRepository.findBySocketId(socket_id);

    const message = await messagesRepository.create({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    });
  });

  socket.on("disconnect", async () => {
    await connectionsRepository.deleteBySocketId(socket.id);
  });
});
