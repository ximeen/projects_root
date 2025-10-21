import { UserController } from "@presentation/controllers/user.controller";
import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
  const controller = new UserController();

  app.post("/users", controller.create.bind(controller.create));
}
