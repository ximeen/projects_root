import { createUserSchema } from "@application/dtos/create-user.dto";
import { CreateUserUseCase } from "@application/use-cases/create-user.use-case";
import { AppError } from "@shared/errors/app-error";
import { FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = createUserSchema.parse(request.body);
      const createUser = container.resolve(CreateUserUseCase);
      const user = await createUser.execute(data);

      return reply.status(201).send({
        id: user.id,
        name: user.name,
        email: user.email.getValue(),
        createdAt: user.createdAt,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ message: error.message });
      }

      throw error;
    }
  }
}
