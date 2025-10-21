import "reflect-metadata";
import { IUserRepository } from "@domain/repositories/user.repository";
import { DrizzleUserRepository } from "@infrastructure/database/repositories/drizzle-user.repository";
import { buildApp } from "@infrastructure/http/fastify/app";
import { env } from "@shared/utils/env";
import { container } from "tsyringe";
import { TOKENS } from "@shared/types/tokens";

container.register(TOKENS.UserRepository, {
  useClass: DrizzleUserRepository,
});

async function server() {
  const app = await buildApp();
  await app.listen({
    port: env.PORT,
    host: "0.0.0.0",
  });

  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
}
server();
