import { User as UserEntity } from "@domain/entities/user.entity";
import type { User } from "@domain/entities/user.entity";
import type { IUserRepository } from "@domain/repositories/user.repository";
import { db } from "../drizzle/client";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { Email } from "@domain/value-objects/email.vo";

export class DrizzleUserRepository implements IUserRepository {
  async create(user: User): Promise<void> {
    await db.insert(users).values({
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

    if (!result[0]) return null;

    return new UserEntity({
      id: result[0].id,
      name: result[0].name,
      email: new Email(result[0].email),
      createdAt: result[0].createdAt,
      updatedAt: result[0].updatedAt,
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!result[0]) return null;

    return new UserEntity({
      id: result[0].id,
      name: result[0].name,
      email: new Email(result[0].email),
      createdAt: result[0].createdAt,
      updatedAt: result[0].updatedAt,
    });
  }

  async update(user: User): Promise<void> {
    await db
      .update(users)
      .set({
        name: user.name,
        email: user.email.getValue(),
        updatedAt: user.updatedAt,
      })
      .where(eq(users.id, user.id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}
