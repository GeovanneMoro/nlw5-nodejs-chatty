import { container } from "tsyringe";

import { ConnectionsRepository } from "../../../../modules/connections/infra/typeorm/repositories/ConnectionsRepository";
import { MessagesRepository } from "../../../../modules/messages/infra/typeorm/repositories/MessagesRepository";
import { io } from "../app";

io.on("connect", async (socket) => {
  const connectionsRepository = container.resolve(ConnectionsRepository);
  const messagesRepository = container.resolve(MessagesRepository);

  const allConnectionsWithoutAdmin =
    await connectionsRepository.findAllWithoutAdmin();
  io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { user_id } = params;

    const allMessages = await messagesRepository.findById(user_id);

    callback(allMessages);
  });

  socket.on("admin_send_message", async (params) => {
    const { user_id, text } = params;

    await messagesRepository.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    const { socket_id } = await connectionsRepository.findByUserId(user_id);

    io.to(socket_id).emit("admin_send_to_client", {
      text,
      socket_id: socket.id,
    });
  });

  socket.on("admin_user_in_support", async (params) => {
    const { user_id } = params;
    await connectionsRepository.updateAdminId(user_id, socket.id);

    const allConnectionsWithoutAdmin =
      await connectionsRepository.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
  });
});
