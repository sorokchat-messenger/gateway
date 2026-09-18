import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/index.js";
import { Logger, StandardSchemaValidationPipe } from "@nestjs/common";
import {
  DocumentBuilder,
  type ReferenceObject,
  type SchemaObject,
  type SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { type AllConfigs } from "./infrastructure/index.js";
import { createSchema } from "zod-openapi";
import {
  AuthorizedOpenapiSchema,
  ErrorOpenapiSchema,
  LoginOpenapiSchema,
  RegisterOpenapiSchema,
  UserOpenapiSchema,
} from "./libs/index.js";
import { GlobalExceptionFilter } from "./global-exception.filter.js";

async function bootstrap() {
  const application = await NestFactory.create(AppModule);
  application.useGlobalPipes(new StandardSchemaValidationPipe());
  application.useGlobalFilters(new GlobalExceptionFilter());
  const configService =
    application.get<ConfigService<AllConfigs>>(ConfigService);
  const protocol: string = configService.getOrThrow("http.protocol", {
    infer: true,
  });
  const host: string = configService.getOrThrow("http.host", {
    infer: true,
  });
  const port: number = configService.getOrThrow("http.port", {
    infer: true,
  });
  const url: string = `${protocol}://${host}:${port}`;
  const swaggerPath: string = "swagger";
  const swaggerUrl: string = `${url}/${swaggerPath}`;
  const logger = new Logger();
  const config = new DocumentBuilder()
    .setTitle("Sorokchat messenger API")
    .setDescription("Gateway service for srokchat microservices")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const documentFactory = () => {
    const document = SwaggerModule.createDocument(application, config);

    document.components = {
      ...document.components,
      schemas: {
        ...document.components?.schemas,
        ...RegisterOpenapiSchema.components,
        ...LoginOpenapiSchema.components,
        ...AuthorizedOpenapiSchema.components,
        ...ErrorOpenapiSchema.components,
        ...UserOpenapiSchema.components,
      },
    };

    return document;
  };
  SwaggerModule.setup(swaggerPath, application, documentFactory);
  await application.listen(port, () => {
    logger.log(`HTTP Gateway service run on ${url}`);
    logger.log(`HTTP Gateway swagger run on ${swaggerUrl}`);
  });
}
await bootstrap();
