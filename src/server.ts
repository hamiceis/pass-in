import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { createEventRouter } from "./routes/create-event";
import { getEvent } from "./routes/get-events";
import { registerEventRouter } from "./routes/register-of-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event.attendees";
import { getAllEvents } from "./routes/get-all-events";

import { errorHandler } from "./error-handler";

const app = fastify();

//CORS
app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description:
        "Especificações da API para o back-end da aplicação pass.in construida no evento NLW Unite.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler); // Adicionando  o compilador de validação do Zod para Routes no Fasitify
app.setSerializerCompiler(serializerCompiler); //  Para validação e serialização de dados de resposta

app.get("/", (request, reply) => {
  return "Hello NLW UNITE";
});

//Registrando as rotas
app.register(getEvent);
app.register(getAllEvents);
app.register(getAttendeeBadge);
app.register(getEventAttendees);
app.register(createEventRouter);
app.register(registerEventRouter);
app.register(checkIn);

app.setErrorHandler(errorHandler);

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running");
});
