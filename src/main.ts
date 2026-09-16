import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/index.js";
import { Logger, StandardSchemaValidationPipe } from "@nestjs/common";
import {
  DocumentBuilder,
  type SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { type AllConfigs } from "./infrastructure/index.js";
import { createSchema } from "zod-openapi";

async function bootstrap() {
  const application = await NestFactory.create(AppModule);
  application.useGlobalPipes(new StandardSchemaValidationPipe());
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
    .setTitle("Sorokchat messenger")
    .setDescription("Gateway service for srokchat microservices")
    .setVersion("1.0")
    .build();

  const documentOptions: SwaggerDocumentOptions = {
    standardSchemaConverter: (schema, { schemaType }) => {
      console.log("Converter called for:", schemaType, schema);
      const converted = createSchema(schema as never, {
        io: schemaType,
        openapiVersion: "3.2.0",
      });
      return { schema: converted.schema, components: converted.components };
    },
  };
  const documentFactory = () =>
    SwaggerModule.createDocument(application, config, documentOptions);
  SwaggerModule.setup(swaggerPath, application, documentFactory);
  await application.listen(port, () => {
    logger.log(`HTTP Gateway service run on ${url}`);
    logger.log(`HTTP Gateway swagger run on ${swaggerUrl}`);
  });
}
await bootstrap();
