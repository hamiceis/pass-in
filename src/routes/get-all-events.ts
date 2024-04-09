import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "../lib/prisma";
import { z } from "zod"

export async function getAllEvents(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get("/events", {
    schema: {
      summary: "Get all events",
      tags: ["Events"],
      response: {
        200: z.array(
          z.object({
            id: z.string().uuid(),
            title: z.string(),
            details: z.string().nullable(),
            slug: z.string(),
            maximumAttendees: z.number().nullish(),
          })
        )
      },
    }
  }, async (request, reply) => {
    const events = await prisma.event.findMany()
    return reply.send(events)
  })
}