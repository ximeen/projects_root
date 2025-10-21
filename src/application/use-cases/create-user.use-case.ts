import type { CreateUserDTO } from "@application/dtos/create-user.dto";
import { User } from "@domain/entities/user.entity";
import type { IUserRepository } from "@domain/repositories/user.repository";
import { Email } from "@domain/value-objects/email.vo";
import { AppError } from "@shared/errors/app-error";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError("Usuário já existe", 409);
    }

    const user = new User({
      name: data.name,
      email: new Email(data.email),
    });

    await this.userRepository.create(user);
    return user;
  }
}
