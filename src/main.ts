import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/index.js";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ZodValidationPipe } from "nest-swagger-zod";

async function bootstrap() {
  const application = await NestFactory.create(AppModule);
  application.useGlobalPipes(new ZodValidationPipe());
  const protocol: string = "http";
  const host: string = "localhost";
  const port: number = 3000;
  const url: string = `${protocol}://${host}:${port}`;
  const swaggerPath: string = "swagger";
  const swaggerUrl: string = `${url}/${swaggerPath}`;
  const logger = new Logger();
  const config = new DocumentBuilder()
    .setTitle("Sorokchat messenger")
    .setDescription("Gateway service for srokchat microservices")
    .setVersion("1.0")
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(application, config);
  SwaggerModule.setup(swaggerPath, application, documentFactory);
  await application.listen(port, () => {
    logger.log(`HTTP Gateway service run on ${url}`);
    logger.log(`HTTP Gateway swagger run on ${swaggerUrl}`);
  });
}
await bootstrap();
